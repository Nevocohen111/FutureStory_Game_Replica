package com.example.Maplestory.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "users")
@Data
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @GenericGenerator(name = "native", strategy = "native")
    private Integer id;

    @NotBlank(message = "First name is required")
    private String name;

    @Email(message = "Email is required")
    private String email;

    @Pattern(regexp = "^(?=.*[A-Z]).{6,}$", message = "Password should contain at least 1 uppercase letter and 6 characters long")
    private String pwd;

    private String accessToken;

    private String verified;

    private String fpToken;
}
