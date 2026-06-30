package com.e_commerce.user_service.controller;

import com.e_commerce.user_service.dto.auth.LoginUserDTO;
import com.e_commerce.user_service.dto.auth.OPTVarificationDTO;
import com.e_commerce.user_service.dto.auth.RegisterUserDTO;
import com.e_commerce.user_service.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register-customer/")
    public ResponseEntity<Integer> registerCustomerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        return authService.registerCustomer(registerUserDTO);
    }

    @PostMapping("/register-admin/")
    public ResponseEntity<Integer> registerAdminUser(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        return authService.registerAdmin(registerUserDTO);
    }

    @PostMapping("/register-seller/")
    public ResponseEntity<Integer> registerSellerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        return authService.registerSeller(registerUserDTO);
    }

    @PostMapping("/login/")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginUserDTO loginUserDTO) {
        return authService.loginUser(loginUserDTO);
    }

    @PostMapping("/verify-opt/")
    public ResponseEntity<?> verifyOTPCode(@Valid @RequestBody OPTVarificationDTO optVarificationDTO) {
        return authService.verifyOTPCode(optVarificationDTO);
    }

}
