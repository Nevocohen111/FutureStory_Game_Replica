package com.example.Maplestory.controller;

import com.example.Maplestory.entity.User;
import com.example.Maplestory.repository.UserRepository;
import com.example.Maplestory.response.Response;
import com.example.Maplestory.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/register")
public class RegisterController {

    private String access;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/add")
    @Transactional
    public ResponseEntity<Response> register (@Valid @RequestBody User user, Errors errors) {
        if(errors.hasErrors()) {
            if(errors.getFieldError("email") != null) {
                return ResponseEntity.status(400).body(new Response(Objects.requireNonNull(errors.getFieldError("email")).getDefaultMessage()));
            }
            if(errors.getFieldError("name") != null) {
                return ResponseEntity.status(401).body(new Response(Objects.requireNonNull(errors.getFieldError("name")).getDefaultMessage()));
            }
            if(errors.getFieldError("password") != null) {
                return ResponseEntity.status(402).body(new Response(Objects.requireNonNull(errors.getFieldError("password")).getDefaultMessage()));
            }
        }else {
            if(userRepository.findByEmail(user.getEmail()) != null) {
                return ResponseEntity.status(403).body(new Response("Email is already taken"));
            }
            if(userRepository.findByName(user.getName()) != null) {
                return ResponseEntity.status(404).body(new Response("Username is already taken"));
            }
            user.setPwd(passwordEncoder.encode(user.getPwd()));
            userRepository.save(user);
            access = RandomString.make(30);
            userRepository.updateAccessTokenByMail(access, user.getEmail());
            String activate = "http://localhost:8080/activate?access=" + access;
            try {
                sendEmail(user.getEmail(), activate);
            } catch (MessagingException | UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.status(200).body(new Response(user.getName() + ", Welcome to Maplestory"));
    }


    @PostMapping("/verify")
    @Transactional
    public ResponseEntity<Response> updateVerifiedUser(@RequestParam("access") String accessToken) {
        User user = userRepository.findByAccessToken(accessToken);
        if(user != null) {
            userService.updateVerifiedByAccessToken("true", accessToken);
            return ResponseEntity.status(200).body(new Response("Your account has been activated"));
        }
        return ResponseEntity.status(400).body(new Response("Invalid access token"));
    }


    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        //create user only when the user clicks the link in the email.
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "Activate account";
        String content =
                "<p>Hello, Welcome to our futuristic Maple world!</p>" +
                "<p>In order to log in please click the link below</p>" +
                "<p><a href='" + link + "'>Activate account</a></p>" +
                "<br>" +
                "<p>Thanks and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }
}
