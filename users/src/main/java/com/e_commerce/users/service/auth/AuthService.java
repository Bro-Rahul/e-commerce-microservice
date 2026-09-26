package com.e_commerce.users.service.auth;

import com.e_commerce.users.dto.auth.LoginRequestDTO;
import com.e_commerce.users.dto.auth.LoginResponseDTO;
import com.e_commerce.users.dto.user.CreateUserRequest;
import com.e_commerce.users.model.UserInfo;
import com.e_commerce.users.model.Users;
import com.e_commerce.users.model.UsersRole;
import com.e_commerce.users.repo.UsersRepo;
import com.e_commerce.users.service.seller.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class AuthService {

    private final UsersRepo usersRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;


    public ResponseEntity<LoginResponseDTO> loginUser(LoginRequestDTO authRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            Users user = usersRepo.findByEmail(authRequest.getEmail()).get();
            Map<String,Object> claims = new HashMap<>();
            claims.put("role",user.getRole().toString());
            claims.put("id",user.getId());
            UserDetails userInfo = new UserInfo(user);
            String token = jwtService.generateToken(claims,userInfo);
            return ResponseEntity.ok().body(new LoginResponseDTO(token));
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    public void registerSellerUser(CreateUserRequest userRequest){
        userService.createUser(userRequest, UsersRole.SELLER);
    }

    public void registerCustomerUser(CreateUserRequest userRequest){
        userService.createUser(userRequest,UsersRole.CUSTOMER);
    }

}
