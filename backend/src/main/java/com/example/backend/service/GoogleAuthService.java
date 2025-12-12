package com.example.backend.service;



import com.example.backend.model.User.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.jwt.JwtService;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${google.client-id}")
    private String googleClientId;

    public String authenticateGoogleUser(String googleIdToken) {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
                .Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(java.util.Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(googleIdToken);
        } catch (Exception e) {
            throw new RuntimeException("Invalid Google ID Token");
        }

        if (idToken == null) {
            throw new RuntimeException("Invalid Google token");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        String email = payload.getEmail();
        String name = (String) payload.get("name");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setFullName(name);
                    newUser.setRole(Role.LEARNER);
                    newUser.setPasswordHash("GOOGLE_USER"); // not used
                    return userRepository.save(newUser);
                });

        return  jwtService.generateToken(user.getId(), user.getEmail());

    }
}
