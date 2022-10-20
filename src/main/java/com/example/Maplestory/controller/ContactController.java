package com.example.Maplestory.controller;

import com.example.Maplestory.entity.Contact;
import com.example.Maplestory.repository.ContactRepository;
import com.example.Maplestory.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ContactRepository contactRepository;


    @PostMapping("/send")
    public ResponseEntity<Response> sendEmail(@RequestBody Contact contact, Errors errors, CorsRegistry registry) throws MessagingException, UnsupportedEncodingException {
        registry.addMapping("/**").allowedOrigins("http://localhost:3000");
        if(errors.hasErrors()) {
            if(errors.getFieldError("email") != null) {
                return ResponseEntity.status(400).body(new Response(Objects.requireNonNull(errors.getFieldError("email")).getDefaultMessage()));
            }
            if(errors.getFieldError("name") != null) {
                return ResponseEntity.status(401).body(new Response(Objects.requireNonNull(errors.getFieldError("name")).getDefaultMessage()));
            }
            if(errors.getFieldError("lastName") != null) {
                return ResponseEntity.status(402).body(new Response(Objects.requireNonNull(errors.getFieldError("message")).getDefaultMessage()));
            }
        }else {
           if(!contact.getGlitch().equals("false")) {
               sendEmailRegradingGlitch(contact.getEmail(),contact.getName());
               return ResponseEntity.status(200).body(new Response("Email sent"));

           }else if(!contact.getFm().equals("false")) {
               sendEmailRegradingFM(contact.getEmail(),contact.getName());
               return ResponseEntity.status(200).body(new Response("Email sent"));

           }else if(!contact.getReport().equals("")) {
                sendEmailRegradingReport(contact.getEmail(),contact.getName(),contact.getReport());
                return ResponseEntity.status(200).body(new Response("Email sent"));

           }else if(!contact.getClient().equals("false")){
               System.out.println(contact.getClient());
               sendEmailRegradingClient(contact.getEmail(),contact.getName(),contact.getClient());
               return ResponseEntity.status(200).body(new Response("Email sent"));

           }else if(!contact.getMessage().equals("")) {
                sendEmailRegradingMessage(contact.getEmail(),contact.getName(),contact.getMessage());
                return ResponseEntity.status(200).body(new Response("Email sent"));
           }

        }
        return ResponseEntity.status(200).body(new Response("Email not sent"));



    }



    public void sendEmailRegradingMessage(String recipientEmail,String name,String msg) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "You have received a message from FutureStory";
        String content = "<p>Hello</p>" +
                "<p>.Hello " + name  + ", we have received your message </p>" +
                "<p>Message: " + msg + "</p>" +
                "<p>.We will do the best we can to help you as soon as possible</p>" +
                "<p>Thanks for understanding and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }





    public void sendEmailRegradingReport(String recipientEmail,String name,String hackerName) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "You have received a message from FutureStory";
        String content = "<p>Hello</p>" +
                "<p>.Hello " + name  + ", thanks for reporting " + hackerName + ", we will inspect his activities.</p>" +
                "<p>.if you see another Hacking or suspicious activity in our server, please inform us again</p>" +
                "<p>Thanks for understanding and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }


    public void sendEmailRegradingClient(String recipientEmail,String name,String hackerName) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "You have received a message from FutureStory";
        String content = "<p>Hello</p>" +
                "<p>.Hello " + name  + ", thanks for contacting us.</p>" +
                "<p>.if you experience in game disconnection it's mostly due to the fact your anti-virus isn't familiar with our server</p>" +
                "<p>.In order to overcome this situation, you need to add our server to your anti-virus whitelist</p>" +
                "<p>.If its not the case, please configure your readme.txt row 5 from '3' to '5'. This will decrease your ping a little but will solve your disconnection issue</p>" +
                "<p>.If that also does not work try reinstalling the game</p>" +
                "<p>Thanks for understanding and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }








    public void sendEmailRegradingFM(String recipientEmail,String name) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "You have received a message from FutureStory";
        String content = "<p>Hello</p>" +
                "<p>.Hello " + name  + ", we got informed you have a problem regarding our Free Market area</p>" +
                "<p>.This bug started since the last patch, we are mildly sorry for the inconvenience</p>" +
                "<p>.The next game update should fix that problem</p>" +
                "<p>Thanks for understanding and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }





    public void sendEmailRegradingGlitch(String recipientEmail,String name) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "FutureStory");
        helper.setTo(recipientEmail);
        String subject = "You have received a message from FutureStory";
        String content = "<p>Hello</p>" +
                "<p>.Hello " + name + ", we got informed you have a glitch in our game</p>" +
                "<p>.We will put your character under inspection </p>" +
                "<p>.for the next 2 hours don't log in please</p>" +
                "<p>Thanks for understanding and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }
}
