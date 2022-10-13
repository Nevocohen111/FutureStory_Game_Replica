package com.example.Maplestory.controller;

import com.example.Maplestory.entity.User;
import com.example.Maplestory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @PostMapping("/add")
    public ResponseEntity<User> login(@RequestBody User user) {
        User user1 = userService.findByName(user.getName());
        if (user1 != null) {
            if (user1.getVerified().equals("true") && passwordEncoder.matches(user.getPwd(), user1.getPwd()) && userService.getEmailByName(user1.getName()).equals(user.getEmail())) {
                userService.resetAccessToken(user1);
                return ResponseEntity.status(200).body(user1);
            } else {
                return ResponseEntity.status(400).header("message", "Please verify your email").body(user1);
            }
        } else {
            return ResponseEntity.status(401).header("message", "Incorrect register").body(null);
        }
    }
}
