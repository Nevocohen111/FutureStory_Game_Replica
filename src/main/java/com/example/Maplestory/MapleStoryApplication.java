package com.example.Maplestory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "AuditAwareBean")
public class MapleStoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(MapleStoryApplication.class, args);
	}

}
