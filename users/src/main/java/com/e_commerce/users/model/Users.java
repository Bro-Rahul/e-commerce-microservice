package com.e_commerce.users.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Data
@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String firstName;

    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(unique = true)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UsersRole role;

    private AccountStatus accountStatus;

    private String profileImage;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "user")
    private Address address;

    @OneToOne(mappedBy = "userId")
    private SellerProfile sellerProfile;


    @PrePersist
    protected void onCreate(){
        accountStatus = AccountStatus.PENDING_VERIFICATION;
    }
}
