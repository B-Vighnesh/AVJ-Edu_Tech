package com.example.backend.DTO;

import lombok.Data;

@Data
public class OtpRequest {

    private String email;
    private String purpose;
    private String otp;
}
