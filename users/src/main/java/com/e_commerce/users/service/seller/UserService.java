package com.e_commerce.users.service.seller;

import com.e_commerce.users.dto.user.CreateUserRequest;
import com.e_commerce.users.mapper.AddressMapper;
import com.e_commerce.users.mapper.UserMapper;
import com.e_commerce.users.model.Address;
import com.e_commerce.users.model.Users;
import com.e_commerce.users.model.UsersRole;
import com.e_commerce.users.repo.AddressRepo;
import com.e_commerce.users.repo.UsersRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

    private final UsersRepo repo;
    private final UserMapper userMapper;
    private final AddressRepo addressRepo;
    private final AddressMapper addressMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createUser(CreateUserRequest userRequest,UsersRole role){
        Users user = userMapper.toEntity(userRequest);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(role);
        Users updatedUser = repo.save(user);
        Address address = addressMapper.toEntity(userRequest.getAddressRequest());
        address.setUser(updatedUser);
        addressRepo.save(address);
    }

    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok().body( repo.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList());
    }

}
