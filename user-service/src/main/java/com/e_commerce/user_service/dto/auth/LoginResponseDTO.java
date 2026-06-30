package com.e_commerce.user_service.dto.auth;

import com.e_commerce.user_service.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private int id;
    private String username;
    private String email;
    private Role role;
    private String avatar;
    private String token;
}
