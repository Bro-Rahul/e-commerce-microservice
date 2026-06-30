package com.e_commerce.user_service.service;

import com.e_commerce.user_service.dto.auth.LoginResponseDTO;
import com.e_commerce.user_service.dto.auth.LoginUserDTO;
import com.e_commerce.user_service.dto.auth.OPTVarificationDTO;
import com.e_commerce.user_service.dto.auth.RegisterUserDTO;
import com.e_commerce.user_service.mapper.UserMapper;
import com.e_commerce.user_service.model.AccountStatus;
import com.e_commerce.user_service.model.Role;
import com.e_commerce.user_service.model.UserPrincipal;
import com.e_commerce.user_service.model.Users;
import com.e_commerce.user_service.repo.UsersRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserMapper userMapper;
    private final UsersRepo usersRepo;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final OutBoxService outBoxService;
    private final RedisTemplate<String, Object> redisTemplate;

    public Users registerUserHelper(RegisterUserDTO accountCreation) {
        return userMapper.toEntity(accountCreation);
    }

    private Optional<Users> getUser(RegisterUserDTO accountCreationDTO) {
        return usersRepo.findByUsername(accountCreationDTO.getUsername());
    }

    @Transactional
    public ResponseEntity<Integer> registerAdmin(RegisterUserDTO accountCreationDTO) {
        Optional<Users> optionalUsers = getUser(accountCreationDTO);
        if (optionalUsers.isPresent()) {
            outBoxService.emailVarificationEvent(optionalUsers.get());
            return ResponseEntity.status(HttpStatus.CREATED).body(optionalUsers.get().getId());
        }
        Users user = registerUserHelper(accountCreationDTO);
        user.setRole(Role.ADMIN);
        user.setPassword(passwordEncoder.encode(accountCreationDTO.getPassword()));
        Users updatedUser = usersRepo.save(user);
        outBoxService.emailVarificationEvent(updatedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser.getId());
    }

    @Transactional
    public ResponseEntity<Integer> registerCustomer(RegisterUserDTO accountCreationDTO) {
        Optional<Users> optionalUsers = getUser(accountCreationDTO);
        if (optionalUsers.isPresent()) {
            outBoxService.emailVarificationEvent(optionalUsers.get());
            return ResponseEntity.status(HttpStatus.CREATED).body(optionalUsers.get().getId());
        }
        Users user = registerUserHelper(accountCreationDTO);
        user.setRole(Role.CUSTOMER);
        user.setPassword(passwordEncoder.encode(accountCreationDTO.getPassword()));
        Users updatedUser = usersRepo.save(user);
        outBoxService.emailVarificationEvent(updatedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser.getId());
    }

    @Transactional
    public ResponseEntity<Integer> registerSeller(RegisterUserDTO accountCreationDTO) {
        Optional<Users> optionalUsers = getUser(accountCreationDTO);
        if (optionalUsers.isPresent()) {
            outBoxService.emailVarificationEvent(optionalUsers.get());
            return ResponseEntity.status(HttpStatus.CREATED).body(optionalUsers.get().getId());
        }
        Users user = registerUserHelper(accountCreationDTO);
        user.setRole(Role.SELLER);
        user.setPassword(passwordEncoder.encode(accountCreationDTO.getPassword()));
        Users updatedUser = usersRepo.save(user);
        outBoxService.emailVarificationEvent(updatedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser.getId());
    }

    public ResponseEntity<?> loginUser(LoginUserDTO loginUserDTO) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                loginUserDTO.getUsername(), loginUserDTO.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(authToken);
            LoginResponseDTO responseDTO = userMapper
                    .toLoginResponse(usersRepo.findByUsername(authentication.getName()).get());

            UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
            String role = user.getAuthorities().iterator().next().getAuthority();
            String token = jwtService.generateToken(loginUserDTO.getUsername(), role, user.getUser().getId());
            responseDTO.setToken(token);
            return ResponseEntity.ok().body(responseDTO);
        } catch (AuthenticationException ex) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid User Request!");
            return ResponseEntity.badRequest().body(response);
        }
    }

    public ResponseEntity<?> verifyOTPCode(
            OPTVarificationDTO otpVerification) {

        Object otpObj = redisTemplate.opsForValue()
                .get(String.valueOf(otpVerification.getUserId()));

        Map<String, String> response = new HashMap<>();
        if (otpObj == null) {
            response.put("error", "OTP is expired generate new one");
            return ResponseEntity.badRequest().body(response);
        }

        String validOtp = otpObj.toString();

        if (!validOtp.equals(otpVerification.getOtpCode())) {
            response.put("error", "Invalid OTP");
            return ResponseEntity.badRequest().body(response);
        }

        Users user = usersRepo.findById(otpVerification.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(AccountStatus.CREATED);
        usersRepo.save(user);

        redisTemplate.delete(String.valueOf(otpVerification.getUserId()));
        response.put("info", "Account Created");
        return ResponseEntity.ok().body(response);
    }
}
