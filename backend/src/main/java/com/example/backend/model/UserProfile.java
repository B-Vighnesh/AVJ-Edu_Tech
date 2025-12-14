package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    @JoinColumn(name = "user_id")
    private User user;

    private String jobTitle;

    private String phoneNo;

    @Enumerated(EnumType.STRING)
    private ExperienceLevel experienceLevel;

    private String company;

    @Column(columnDefinition = "TEXT")
    private String bio;

    public enum ExperienceLevel { BEGINNER, INTERMEDIATE, ADVANCED }
}
