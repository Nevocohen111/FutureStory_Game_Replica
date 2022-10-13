package com.example.Maplestory.service;

import com.example.Maplestory.entity.User;
import com.example.Maplestory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Transactional
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public void  updateAccessTokenByMail(String accessToken, String email) {
         userRepository.updateAccessTokenByMail(accessToken, email);
    }

    public void updateVerifiedByAccessToken(String aTrue, String accessToken) {
        userRepository.updateVerifiedByAccessToken(aTrue, accessToken);
    }


    public void resetAccessToken(User user) {
            user.setAccessToken(null);
            userRepository.save(user);
        }

        public User findByEmail(String email) {
            for (User user : userRepository.findAll()) {
                if (user.getEmail().equals(email)) {
                    return user;
                }
            }
            return null;
        }

    public User findByName(String name) {
        for(User user : userRepository.findAll()) {
            if(user.getName().equals(name)) {
                return user;
            }
        }
        return null;
    }
    public User findByPassword(String pwd) {
        return userRepository.findByPwd(pwd);
    }

    public String getEmailByName(String email) {
        return userRepository.findEmailByName(email);
    }


    public User getByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token);
    }

    public void updatePassword(User user, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPwd(encodedPassword);
        user.setFpToken(null);
        userRepository.save(user);
    }
}
