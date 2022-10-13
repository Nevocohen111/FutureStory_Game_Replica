package com.example.Maplestory.repository;

import com.example.Maplestory.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {

    @Query(value = "SELECT * FROM profile WHERE auth_name = ?1", nativeQuery = true)
    Profile findByAuthName(String authName);
    @Modifying
    @Query(value = "DELETE FROM profile WHERE auth_name = ?1", nativeQuery = true)
    void deleteByAuthName(String name);
}
