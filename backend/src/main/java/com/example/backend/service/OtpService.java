package com.example.backend.service;

import com.example.backend.DTO.OtpResponse;
import com.example.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    static class OtpData{
        String otp;
        LocalDateTime expireAt;
        LocalDateTime lastSentAt;
        int attempts;
        OtpData(String otp ,LocalDateTime expireAt,LocalDateTime lastSentAt){
            this.otp=otp;
            this.expireAt=expireAt;
            this.lastSentAt=lastSentAt;
            this.attempts=attempts;

        }


    }

    private JavaMailSender mailSender;
    private final Map<String,OtpData> OtpStore =new HashMap<>();

    @Autowired
    public OtpService(JavaMailSender mailSender){
        this.mailSender=mailSender;
    }
    @Autowired
    private UserRepository userRepository;

    public OtpResponse sendOtp(String email, String purpose){

        boolean exists = userRepository.existsByEmail(email);
        if (purpose.equalsIgnoreCase("REGISTER") && exists) {
            return new OtpResponse(false,"Email Already Exists");
        }
        if (purpose.equalsIgnoreCase("FORGOT_PASSWORD") && !exists) {
            return new OtpResponse(false,"User Not Found");
        }

        if(OtpStore.containsKey(email)){
            OtpData data =OtpStore.get(email);
            if(data.lastSentAt.plusMinutes(3).isAfter(LocalDateTime.now())){
                throw new RuntimeException("Please wait 3 minutes before requesting another OTP.");
            }
        }


        String otp = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiry =LocalDateTime.now().plusMinutes(5);
        LocalDateTime now =LocalDateTime.now();

        OtpStore.put(email,new OtpData(otp,expiry,now));

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("OTP for " + purpose);

            String html = """
        <h2>Your OTP Code</h2>
        <p>Use the OTP below (valid for 5 minutes):</p>
        <h1 style="letter-spacing:4px;">%s</h1>
        """.formatted(otp);


            helper.setText(html, true);
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException("Error sending HTML email", e);
        }



        return new OtpResponse(true,"Otp Sent Successfully")  ;
    }


    public OtpResponse resendOtp(String email,String purpose){

        if(!OtpStore.containsKey(email)){
            sendOtp(email,purpose);

        }
        OtpData data = OtpStore.get(email);

        if (data.lastSentAt.plusMinutes(3).isAfter(LocalDateTime.now())) {
            return new OtpResponse(false,"Resend allowed only after 3 minutes.");
        }

        String newOtp = String.format("%06d", new Random().nextInt(999999));
        data.otp = newOtp;
        data.expireAt = LocalDateTime.now().plusMinutes(5);
        data.lastSentAt = LocalDateTime.now();
        data.attempts = 0;

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("OTP for " + purpose);

            String html = """
        <h2>Your OTP Code</h2>
        <p>Use the OTP below (valid for 5 minutes):</p>
        <h1 style="letter-spacing:4px;">%s</h1>
        """.formatted(newOtp);


            helper.setText(html, true);
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException("Error sending HTML email", e);
        }

        return new OtpResponse(true,"Otp Resend Successfully");

    }

    public boolean verifyOtp(String email ,String otp){
        if (!OtpStore.containsKey(email)) return false;
        OtpData data = OtpStore.get(email);

        if (LocalDateTime.now().isAfter(data.expireAt)) {
            OtpStore.remove(email);
            return false;
        }
        if (data.attempts >= 5) {
            OtpStore.remove(email);
            return false;
        }
        if (!data.otp.equals(otp)) {
            data.attempts++;
                    return true;
                }
        OtpStore.remove(email);
        return true;
    }
}
