package com.e_commerce.users.dto.auth;

import com.e_commerce.users.dto.address.CreateAddressRequest;
import com.e_commerce.users.dto.user.SellerProfileDTO;
import com.e_commerce.users.dto.user.CreateUserRequestDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateSellerUserRequest {

    @NotNull
    @Valid
    private CreateUserRequestDTO user;

    @NotNull
    @Valid
    private CreateAddressRequest addressRequest;

    @NotNull
    @Valid
    private SellerProfileDTO sellerProfile;
}
