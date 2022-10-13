package com.example.Maplestory.repository;

import com.example.Maplestory.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    User findByName(String name);
    @Query(value = "UPDATE users set access_token = ?1 where email = ?2", nativeQuery = true)
    @Modifying
    void updateAccessTokenByMail(String accessToken, String email);

    User findByAccessToken(String accessToken);

    @Query(value = "UPDATE users set verified = ?1 where access_token = ?2", nativeQuery = true)
    @Modifying
    void updateVerifiedByAccessToken(String aTrue, String accessToken);

    @Query(value = "SELECT * FROM users WHERE pwd = ?1", nativeQuery = true)
    User findByPwd(String password);

    @Query(value = "SELECT email FROM users WHERE name = ?1", nativeQuery = true)
    String findEmailByName(String email);

    void deleteByName(String name);


    @Query(value = "SELECT * FROM users WHERE fp_token = ?1", nativeQuery = true)
    User findByResetPasswordToken(String token);
}
