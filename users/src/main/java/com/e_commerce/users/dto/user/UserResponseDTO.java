package com.e_commerce.users.dto.user;

import com.e_commerce.users.dto.address.AddressResponseDTO;
import com.e_commerce.users.model.AccountStatus;
import com.e_commerce.users.model.UsersRole;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponseDTO {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private UsersRole role;
    private AccountStatus accountStatus;
    private String profileImage;
    private LocalDateTime createdAt;

    private AddressResponseDTO address;
}