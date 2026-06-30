package com.e_commerce.user_service.dto.user;

import com.e_commerce.user_service.model.AccountStatus;
import com.e_commerce.user_service.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListUserDTO {

    private int id;

    private String username;

    private String email;

    private Role role;

    private AccountStatus status;

}
