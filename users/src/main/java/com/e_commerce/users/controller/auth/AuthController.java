package com.e_commerce.users.controller.auth;


import com.e_commerce.users.dto.auth.*;
import com.e_commerce.users.service.auth.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@Valid @RequestBody LoginRequestDTO requestDTO){
        return authService.loginUser(requestDTO);
    }

    @PostMapping("/register-seller")
    public void registerSellerUser(@Valid @RequestBody CreateSellerUserRequest userRequest){
        authService.registerSellerUser(userRequest);
    }

    @PostMapping("/register-customer")
    public void registerCustomerUser(@Valid @RequestBody CreateCustomerUserRequest userRequest){
        authService.registerCustomerUser(userRequest);
    }

    @PostMapping("/email-verification")
    public ResponseEntity<String> emailVerification(@Valid @RequestBody OTPVerificationRequest request){
        return authService.validateOTP(request);
    }

}
