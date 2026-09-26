package com.e_commerce.users.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class SellerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String storeName;
    private String storeDescription;

    private String businessName;
    private String businessEmail;
    private String businessPhone;

    private String gstNumber;

    private String logoUrl;

    private LocalDateTime createdAt;

    @OneToOne(cascade = CascadeType.ALL)
    private Users userId;

}