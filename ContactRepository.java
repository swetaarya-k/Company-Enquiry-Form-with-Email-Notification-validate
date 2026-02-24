package com.example.ENQUIRYFORM.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ENQUIRYFORM.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
