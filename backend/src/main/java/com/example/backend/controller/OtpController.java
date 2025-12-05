package com.example.backend.controller;

import com.example.backend.DTO.OtpRequest;
import com.example.backend.DTO.OtpResponse;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/otp")
public class OtpController {
    @Autowired
    private OtpService otpService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send")
    public ResponseEntity<OtpResponse> sendOtp(@RequestBody OtpRequest req){
        OtpResponse res = otpService.sendOtp(req.getEmail(), req.getPurpose());
        if(res.isSuccess())
            return ResponseEntity.ok(res);
        else
            return ResponseEntity.badRequest().body(res);
    }

    @PostMapping("/resend")
    public ResponseEntity<OtpResponse> resendOtp(@RequestBody OtpRequest req){
       OtpResponse res= otpService.resendOtp(req.getEmail(),req.getPurpose());
       if(res.isSuccess())
            return ResponseEntity.ok(res);
       else
           return ResponseEntity.badRequest().body(res);
    }

    @PostMapping("/verify")
    public ResponseEntity<OtpResponse> verifyOtp(@RequestBody OtpRequest req){
        boolean isvalid = otpService.verifyOtp(req.getEmail(),req.getOtp());
        if(!isvalid){
            return ResponseEntity.badRequest().body(new OtpResponse(false, "Invalid Or Expired Otp"));
        }
        else
            return ResponseEntity.ok(new OtpResponse(true,"Otp Verified Successfully"));
    }
}
