package com.e_commerce.users.service.seller;

import com.e_commerce.users.dto.auth.CreateCustomerUserRequest;
import com.e_commerce.users.dto.auth.CreateSellerUserRequest;
import com.e_commerce.users.mapper.AddressMapper;
import com.e_commerce.users.mapper.SellerProfileMapper;
import com.e_commerce.users.mapper.UserMapper;
import com.e_commerce.users.model.Address;
import com.e_commerce.users.model.SellerProfile;
import com.e_commerce.users.model.Users;
import com.e_commerce.users.model.UsersRole;
import com.e_commerce.users.repo.AddressRepo;
import com.e_commerce.users.repo.SellerProfileRepo;
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
    private final SellerProfileMapper sellerProfileMapper;
    private final SellerProfileRepo sellerProfileRepo;

    @Transactional
    public void createCustomerUser(CreateCustomerUserRequest userRequest){
        Users user = userMapper.toEntity(userRequest.getUser());
        user.setPassword(passwordEncoder.encode(userRequest.getUser().getPassword()));
        user.setRole(UsersRole.CUSTOMER);
        Users updatedUser = repo.save(user);
        Address address = addressMapper.toEntity(userRequest.getAddressRequest());
        address.setUser(updatedUser);
        addressRepo.save(address);
    }

    @Transactional
    public void createSellerUser(CreateSellerUserRequest userRequest){
        Users user = userMapper.toEntity(userRequest.getUser());
        user.setPassword(passwordEncoder.encode(userRequest.getUser().getPassword()));
        user.setRole(UsersRole.SELLER);
        Users updatedUser = repo.save(user);
        Address address = addressMapper.toEntity(userRequest.getAddressRequest());
        address.setUser(updatedUser);
        addressRepo.save(address);
        SellerProfile profile = sellerProfileMapper.toEntity(userRequest.getSellerProfile());
        profile.setUserId(user);
        sellerProfileRepo.save(profile);
    }

    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok().body( repo.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList());
    }

}
