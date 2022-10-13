package com.example.Maplestory.controller;

import com.example.Maplestory.entity.Profile;
import com.example.Maplestory.response.Response;
import com.example.Maplestory.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/profile")
public class ProfileController {


    @Autowired
    private ProfileService profileService;


    @PostMapping("/add")
    public Response saveUserProfile(@RequestBody Profile profile, Errors errors) {
        Profile currentProfile = profileService.findByAuthName(profile.getAuthName());
        if(errors.hasErrors()) {
            if(errors.getFieldError("name") != null)
                return new Response(Objects.requireNonNull(errors.getFieldError("name")).getDefaultMessage());
            else if(errors.getFieldError("status") != null)
                return new Response(Objects.requireNonNull(errors.getFieldError("status")).getDefaultMessage());
            else if(errors.getFieldError("url") != null)
                return new Response(Objects.requireNonNull(errors.getFieldError("url")).getDefaultMessage());
        }else if(currentProfile != null) {
            currentProfile.setName(profile.getName());
            currentProfile.setStatus(profile.getStatus());
            currentProfile.setUrl(profile.getUrl());
            profileService.saveUserProfile(currentProfile);
            return new Response("Profile updated");
        }else {
            profile.setAuthName(profile.getAuthName());
            profileService.saveUserProfile(profile);
            return new Response("Profile saved successfully");
        }
        return new Response("Profile not saved");
    }

    @GetMapping("/getPicture")
    public ResponseEntity<Profile> getProfilePic(@RequestParam(value = "authName") String authName) {
        Profile profile = profileService.findByAuthName(authName);
        if(profile != null) {
            return ResponseEntity.status(200).body(profile);
        }
        return null;
    }


}
