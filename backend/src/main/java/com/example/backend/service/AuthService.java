package com.example.backend.service;

import com.example.backend.DTO.AuthResponse;
import com.example.backend.DTO.LoginRequest;
import com.example.backend.DTO.RegisterRequest;
import com.example.backend.jwt.JwtService;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    private OtpService otpService;


    @Autowired
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    public AuthResponse register(RegisterRequest registerRequest)
    {
        if(userRepository.existsByEmail(registerRequest.getEmail()))
        {
            return new AuthResponse(false,"Email already exists",null,null,null);
        }
        if (!otpService.isOtpVerified(registerRequest.getEmail(), "REGISTER")) {
            return new AuthResponse(false, "OTP not verified", null,null,null);
        }

        User user=new User();
        user.setFullName(registerRequest.getFullName());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(User.Role.LEARNER);
        User saved=userRepository.save(user);
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getEmail(),
                        registerRequest.getPassword()
                )
        );
        String token = jwtService.generateToken(saved.getId(), saved.getEmail());
        otpService.clearOtpVerification(registerRequest.getEmail(), "REGISTER");

        return new AuthResponse(true,"Registartion Succcess",token,saved.getId(),saved.getRole().name());
    }


    public AuthResponse login(LoginRequest loginRequest) {

        User user=userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if(user==null)
        {
            return new AuthResponse(false,"User not Found",null,null,null);
        }
        if(!passwordEncoder.matches(loginRequest.getPassword(),user.getPasswordHash()))
        {
            return new AuthResponse(
                    false,
                    "Wrong password",
                    null,
                    null,
                    null
            );
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        String token = jwtService.generateToken(user.getId(), user.getEmail());

        return new AuthResponse(
                true,
                "Login successful",
                token,
                user.getId(),
                user.getRole().name()
        );
    }
    public AuthResponse resetPassword(String email,String newPassword){
        if(!otpService.isOtpVerified(email,"FORGOT_PASSWORD")){
            return new AuthResponse(false,"Otp Not Verified",null,null,null);
        }
        User user =userRepository.findByEmail(email).orElse(null);
        if(user==null)
            return new AuthResponse(false,"User Not found",null,null,null);
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        otpService.clearOtpVerification(email,"FORGOT_PASSWORD");
        return new AuthResponse(true,"Password Reset Successfully",null,null,null);
    }
}
