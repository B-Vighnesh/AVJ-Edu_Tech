package com.example.backend.security;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Supports both:
     *  - username = email   (login/authenticate)
     *  - username = userId  (JWT filter where subject = userId)
     *
     * Returns UserDetails with username set to userId (String) so Authentication.getName() == userId.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user;

        // Try parse as ID first (JWT path)
        try {
            Long userId = Long.valueOf(username);
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));
        } catch (NumberFormatException ex) {
            // Not a numeric username → treat as email (login path)
            Optional<User> userOpt = userRepository.findByEmail(username);
            user = userOpt.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        }

        // Username stored as userId (so Authentication.getName() returns the id)
        String principalName = String.valueOf(user.getId());

        return new org.springframework.security.core.userdetails.User(
                principalName,             // username -> userId as string
                user.getPasswordHash(),    // password (hashed)
                Collections.emptyList()    // authorities (map roles here if you have them)
        );
    }
}
