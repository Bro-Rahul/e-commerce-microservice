package com.e_commerce.users.dto.user;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequestDTO {

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
}
