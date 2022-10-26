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
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    private String token;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;


    @Autowired
    private UserRepository userRepository;

    @Transactional
    @PostMapping("/retrievePassword")
    public ResponseEntity<Response> sendMail(@RequestBody User user) throws MessagingException, UnsupportedEncodingException {
        User currentUser = userService.findByEmail(user.getEmail());
        if(currentUser != null) {
            token = RandomString.make(30);
            currentUser.setFpToken(token);
            userRepository.save(currentUser);
            String resetPasswordLink = "http://localhost:8080/resetPassword?token=" + token;
            sendEmail(user.getEmail(), resetPasswordLink);
            return ResponseEntity.status(200).body(new Response("Email has been sent"));
        } else {
            return ResponseEntity.status(400).body(new Response("Email is invalid"));
        }
    }


    @PutMapping("/resetPassword")
    public ResponseEntity<Response> resetPassword(@RequestParam(value = "token",required = false) String token,@RequestBody User user) {
        if(token != null) {
            User currentUser = userService.getByResetPasswordToken(token);
            if(currentUser != null) {
                if(user.getPwd().matches("^(?=.*[A-Z])(?=.*[0-9]).{6,}$")) {
                    userService.updatePassword(currentUser, user.getPwd());
                    return ResponseEntity.status(200).body(new Response("Password has been reset successfully"));
                }else {
                    return ResponseEntity.status(400).body(new Response("Password must contain at least 1 uppercase letter and 6 digits"));
                }
            } else {
                return ResponseEntity.status(400).body(new Response("The link is invalid, please generate a new one"));
            }
        }
        return ResponseEntity.status(400).body(new Response("Link has expired"));
    }




    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        //create user only when the user clicks the link in the email.
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "Reset Password";
        String content = "<p>Reset Password</p>" +
                "<p>Hello player!</p>" +
                "<p>.We have received an inquiry regarding changing your password</p>" +
                "<p>Please click on the following link to reset your password</p>" +
                "<p><a href='" + link + "'>Reset Password</a></p>" +
                "<br>" +
                "<p>Thanks and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }



}
