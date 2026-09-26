package com.e_commerce.users.dto.user;

import com.e_commerce.users.dto.address.CreateAddressRequest;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateUserRequest {

    @NotBlank(message = "First Name must not be blank")
    private String firstName;

    @NotBlank(message = "Last Name must not be blank")
    private String lastName;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Enter an valid email")
    private String email;

    @NotBlank(message = "Password must not be blank")
    @Size(min = 3)
    private String password;

    @NotBlank(message = "Phone Number must not be blank")
    private String phoneNumber;

    @Nullable
    private String profileImage;

    @NotNull
    @Valid
    private CreateAddressRequest addressRequest;

}
