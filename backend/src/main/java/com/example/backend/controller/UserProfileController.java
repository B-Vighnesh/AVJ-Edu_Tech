package com.example.backend.controller;

import com.example.backend.DTO.ProfileResponse;
import com.example.backend.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getProfile() {

        // Extract userId from JWT subject
        String userIdString = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Long userId = Long.parseLong(userIdString);

        ProfileResponse response = userProfileService.getProfile(userId);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
