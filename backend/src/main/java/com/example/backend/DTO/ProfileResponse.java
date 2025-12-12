package com.example.backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {

    private long id;
    private String email;
    private String fullName;
    private String jobTitle;
    private String experienceLevel;
    private String bio;
    private String phoneNo;
    private String companyName;
    private boolean success;
    private String message;


}
