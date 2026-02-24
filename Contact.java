package com.example.ENQUIRYFORM.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contact")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String mobile;
    private String inquiryType;
    private String country;
    private String industry;

    @Column(length = 1000)
    private String message;
}
