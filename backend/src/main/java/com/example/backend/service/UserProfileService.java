package com.example.backend.service;

import com.example.backend.DTO.ProfileResponse;
import com.example.backend.model.User;
import com.example.backend.model.UserProfile;
import com.example.backend.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;


    public ProfileResponse getProfile(Long userId){
        UserProfile profile= userProfileRepository.findByUserId(userId);

        if(profile!=null){
            return new ProfileResponse(
                    profile.getId(),
                    "akashshenvi93@gmail.com",
                    "Akash",
                    profile.getJobTitle(),
                    "Biggner",
                    profile.getBio(),
                    profile.getPhoneNo(),
                    profile.getCompany(),
                    true,
                    "User Profile Found"



            );
        }
        else{
            return new ProfileResponse(
                    0,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    false,
                    "Profile not found"
            );
        }

    }


}
