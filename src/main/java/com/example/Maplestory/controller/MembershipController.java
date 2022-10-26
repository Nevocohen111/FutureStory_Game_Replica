package com.example.Maplestory.controller;

import com.example.Maplestory.entity.User;
import com.example.Maplestory.repository.UserRepository;
import com.example.Maplestory.response.Response;
import com.example.Maplestory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/membership")
public class MembershipController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;


    @PostMapping("/add")
    public ResponseEntity<Response> AddMembership(@RequestBody User user, @RequestParam(required = false, value = "name") String name) throws MessagingException, UnsupportedEncodingException {
        User currentUser = userService.findByName(name);
        if (currentUser != null && currentUser.getMembership().isEmpty()) {
            switch (user.getMembership()) {
                case "gm" -> sendGmEmail(user.getEmail());
                case "inspector" -> sendInspectorEmail(user.getEmail());
                case "tester" -> sendTesterEmail(user.getEmail());
            }
            currentUser.setMembership(user.getMembership());
            userRepository.save(currentUser);
            return ResponseEntity.status(200).body(new Response("Membership has been added"));
        }
        else if(currentUser != null && !currentUser.getMembership().isEmpty()){
            return ResponseEntity.status(400).body(new Response("Membership has already been added"));
        }
        else {
            return ResponseEntity.status(400).body(new Response("User does not exist"));
        }
    }

    public void sendGmEmail(String recipientEmail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        //create user only when the user clicks the link in the email.
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "Hello new GM";
        String content = "<p>General Manager membership</p>" +
                "<p>Welcome aboard!</p>" +
                "<p>.We are happy you decided to join as one of our new General Managers in the game</p>" +
                "<p>.Please join our discord link which is specified in the website</p>" +
                "<p>!You will receive guidance related to the current conduct of our team via one of our seniors in no time </p>" +
                "<br>" +
                "<p>!Thanks again for joining us, and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public void sendInspectorEmail(String recipientEmail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        //create user only when the user clicks the link in the email.
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "Hello new Inspector";
        String content = "<p>Server Inspector membership</p>" +
                "<p>Welcome aboard!</p>" +
                "<p>.We are happy you decided to join as one of our new Server inspectors in the game</p>" +
                "<p>.Please join our discord link which is specified in the website</p>" +
                "<p>!You will receive guidance related to the current conduct of our team via one of our seniors in no time </p>" +
                "<br>" +
                "<p>!Thanks again for joining us, and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public void sendTesterEmail(String recipientEmail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        //create user only when the user clicks the link in the email.
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "Hello new Tester";
        String content = "<p>Maintenance Tester membership</p>" +
                "<p>Welcome aboard!</p>" +
                "<p>.We are happy you decided to join as one of our new Maintenance Testers in the game</p>" +
                "<p>.Please join our discord link which is specified in the website</p>" +
                "<p>!You will receive guidance related to the current conduct of our team via one of our seniors in no time </p>" +
                "<br>" +
                "<p>!Thanks again for joining us, and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }
}
