package com.e_commerce.catalog_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JWTUser {

    private Long id;

    private String username;

    private String role;
}
