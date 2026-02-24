package com.example.ENQUIRYFORM.controller;

import com.example.ENQUIRYFORM.model.Contact;
import com.example.ENQUIRYFORM.repository.ContactRepository;
import com.example.ENQUIRYFORM.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> submitContact(@RequestBody Contact contact) {
        try {
            // Save to DB
            contactRepository.save(contact);
            logger.info("Enquiry saved for: {}", contact.getEmail());

            // Email to Admin
            String adminMessage =
                    "New Enquiry Received\n\n" +
                             "Name: " + contact.getName() +
                            "\nEmail: " + contact.getEmail() +
                            "\nMobile: " + contact.getMobile() +
                            "\nInquiry Type: " + contact.getInquiryType() +
                            "\nCountry: " + contact.getCountry() +
                            "\nIndustry: " + contact.getIndustry() +
                            "\nMessage:\n" + contact.getMessage();

            emailService.sendMail(
                    "admin@gmail.com",  // replace with your admin email
                    "New Enquiry - " + contact.getInquiryType(),
                    adminMessage
            );
            logger.info("Admin email sent for: {}", contact.getEmail());

            // Auto-reply to user
            String userMessage =
                    "Hi " + contact.getName() + ",\n\n" +
                            "Thank you for contacting us.\n" +
                            "We have received your enquiry regarding \"" + contact.getInquiryType() + "\".\n\n" +
                            "Our team will reach out to you shortly.\n\n" +
                            "Best Regards,\nSupport Team";

            emailService.sendMail(contact.getEmail(),
                    "We Received Your Enquiry",
                    userMessage
            );
            logger.info("User email sent to: {}", contact.getEmail());

            return ResponseEntity.ok("Enquiry submitted successfully");
        } catch (Exception e) {
            logger.error("Error submitting enquiry: {}", e.getMessage());
            return ResponseEntity.status(500)
                    .body("Failed to submit enquiry: " + e.getMessage());
        }
    }
}
