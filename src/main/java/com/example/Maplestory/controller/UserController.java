package com.example.Maplestory.controller;

import com.example.Maplestory.entity.User;
import com.example.Maplestory.repository.ProfileRepository;
import com.example.Maplestory.repository.UserRepository;
import com.example.Maplestory.response.HttpCustomResponse;
import com.example.Maplestory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileRepository profileRepository;


    @DeleteMapping("/delete")
    @Transactional
    public ResponseEntity<HttpCustomResponse> deleteUser(RequestEntity<User> request) {
        User user = request.getBody();
        assert user != null;
        if(userService.findByName(user.getName()) != null) {
            if(profileRepository.findByAuthName(user.getName()) != null) {
                profileRepository.deleteByAuthName(user.getName());
            }
            userRepository.deleteByName(user.getName());
            return ResponseEntity.status(200).body(new HttpCustomResponse(200, user.getName() + " has been deleted"));
        } else {
            return ResponseEntity.status(400).body(new HttpCustomResponse(400, user.getName() + " does not exist"));
        }

    }
}
