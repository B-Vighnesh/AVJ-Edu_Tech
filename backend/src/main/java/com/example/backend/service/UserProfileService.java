package com.example.backend.service;

import com.example.backend.DTO.ProfileResponse;
import com.example.backend.model.User;
import com.example.backend.model.UserProfile;
import com.example.backend.repository.UserProfileRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    @Cacheable(value = "userProfile", key = "#userId")
    public ProfileResponse getProfile(Long userId){
        UserProfile profile= userProfileRepository.findByUserId(userId);

        User user =profile.getUser();
        if(profile!=null){
            return new ProfileResponse(
                    profile.getId(),
                    user.getEmail(),
                    user.getFullName(),
                    profile.getJobTitle(),
                    "asd",
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
