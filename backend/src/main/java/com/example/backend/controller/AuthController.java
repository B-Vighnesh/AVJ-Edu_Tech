package com.example.backend.controller;

import com.example.backend.DTO.*;
import com.example.backend.service.AuthService;
import com.example.backend.service.GoogleAuthService;
import com.example.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    private final OtpService otpService;

    private final GoogleAuthService googleAuthService;

    @Autowired
    public AuthController(AuthService authService, OtpService otpService, GoogleAuthService googleAuthService) {
        this.authService = authService;
        this.otpService = otpService;
        this.googleAuthService = googleAuthService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest)
    {
        AuthResponse authResponse=authService.register(registerRequest);
        if(authResponse.isSuccess())
        {
            return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest)
    {
        AuthResponse authResponse=authService.login(loginRequest);
        if(authResponse.isSuccess())
        {
            return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<AuthResponse> resetPassword (@RequestBody ResetPasswordRequest resetPasswordRequest){
        AuthResponse authResponse=authService.resetPassword(resetPasswordRequest.getEmail(), resetPasswordRequest.getNewPassword());
        if(authResponse.isSuccess())
            return ResponseEntity.ok(authResponse);
        else
            return ResponseEntity.badRequest().body(authResponse);
    }
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
        else {
            otpService.markOtpVerified(req.getEmail(), req.getPurpose());
            return ResponseEntity.ok(new OtpResponse(true, "Otp Verified Successfully"));
        }
    }
    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody Map<String, String> request) {

        String idToken = request.get("idToken");

        String jwt = googleAuthService.authenticateGoogleUser(idToken);

        AuthResponse response = new AuthResponse(true, "Login success", jwt);

        return ResponseEntity.ok(response);
    }

}
