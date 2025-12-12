package com.example.backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        // Convert Base64 string → valid SecretKey for HS256
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    // -------------------------
    // Generate JWT
    // -------------------------
    public String generateToken(Long userId, String email) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);

        return Jwts.builder()
                .claims(claims)
                .subject(String.valueOf(userId))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)  // REQUIRED FOR HS256
                .compact();
    }

    // -------------------------
    // Extract User ID
    // -------------------------
    public Long extractUserId(String token) {
        return Long.valueOf(extractAllClaims(token).getSubject());
    }

    // -------------------------
    // Extract Email Claim
    // -------------------------
    public String extractEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    // -------------------------
    // Validate Token
    // -------------------------
    public boolean isTokenValid(String token, Long expectedUserId) {
        return extractUserId(token).equals(expectedUserId) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // -------------------------
    // Extract Claims
    // -------------------------
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())  // NON-DEPRECATED
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
