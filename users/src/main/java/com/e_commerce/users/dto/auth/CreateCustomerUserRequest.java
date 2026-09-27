package com.e_commerce.users.dto.auth;

import com.e_commerce.users.dto.address.CreateAddressRequest;
import com.e_commerce.users.dto.user.CreateUserRequestDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateCustomerUserRequest {

    @NotNull
    @Valid
    private CreateUserRequestDTO user;

    @NotNull
    @Valid
    private CreateAddressRequest addressRequest;

}
