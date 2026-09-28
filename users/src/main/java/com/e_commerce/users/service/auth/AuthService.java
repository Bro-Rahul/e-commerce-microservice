package com.e_commerce.users.service.auth;

import com.e_commerce.users.dto.auth.*;
import com.e_commerce.users.mapper.UserMapper;
import com.e_commerce.users.model.AccountStatus;
import com.e_commerce.users.model.UserInfo;
import com.e_commerce.users.model.Users;
import com.e_commerce.users.repo.UsersRepo;
import com.e_commerce.users.service.customer.CustomerUserService;
import com.e_commerce.users.service.seller.SellerUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {

    private final UsersRepo usersRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SellerUserService sellerUserService;
    private final CustomerUserService createCustomerUser;
    private final UserMapper userMapper;
    private final RedisTemplate<String,Object> redisTemplate;

    public ResponseEntity<LoginResponseDTO> loginUser(LoginRequestDTO authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            Users user = usersRepo.findByEmail(authRequest.getEmail()).get();
            Map<String, Object> claims = new HashMap<>();
            claims.put("role", user.getRole().toString());
            claims.put("id", user.getId());
            UserDetails userInfo = new UserInfo(user);
            String token = jwtService.generateToken(claims, userInfo);
            return ResponseEntity.ok().body(new LoginResponseDTO(token, userMapper.toResponse(user)));
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    public void registerSellerUser(CreateSellerUserRequest userRequest) {
        sellerUserService.createSellerUser(userRequest);
    }

    public void registerCustomerUser(CreateCustomerUserRequest userRequest) {
        createCustomerUser.createCustomerUser(userRequest);
    }

    @Transactional
    public ResponseEntity<String> validateOTP(OTPVerificationRequest verificationRequest){
        Object value = redisTemplate.opsForValue().get(String.format("%s-code",verificationRequest.getEmail()));
        if(value == null){
            return ResponseEntity.badRequest().body("OTP code has been expired try to re-send again");
        }
        String otpCode = (String) value;
        boolean isValidCode = otpCode.equals(verificationRequest.getCode());

        if(!isValidCode)
            return ResponseEntity.badRequest().body("Invalid OTP");
        Users user = usersRepo.findByEmail(verificationRequest.getEmail()).get();
        user.setAccountStatus(AccountStatus.ACTIVE);
        usersRepo.save(user);
        return ResponseEntity.ok().body("Email Verified");
    }

}
