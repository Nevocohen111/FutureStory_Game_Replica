package com.example.Maplestory.service;

import com.example.Maplestory.entity.Profile;
import com.example.Maplestory.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService{

    @Autowired
    private ProfileRepository profileRepository;


    public void saveUserProfile(Profile profile) {
        profileRepository.save(profile);
    }

    public Profile findByAuthName(String name) {
        return profileRepository.findByAuthName(name);
    }
}
