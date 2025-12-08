package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthResponse {

    private boolean success;
    private String message;
    private String token;
    private Long userId;
    private String role;

    public AuthResponse(boolean b, String loginSuccess, String jwt) {
        this.success=b;
        this.message=loginSuccess;
        this.token=jwt;
    }
}
