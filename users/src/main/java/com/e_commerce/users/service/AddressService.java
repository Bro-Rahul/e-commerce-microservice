package com.e_commerce.users.service;

import com.e_commerce.users.dto.address.CreateAddressRequest;
import com.e_commerce.users.mapper.AddressMapper;
import com.e_commerce.users.model.Address;
import com.e_commerce.users.model.Users;
import com.e_commerce.users.repo.AddressRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AddressService {

    private final AddressMapper addressMapper;
    private final AddressRepo addressRepo;

    @Transactional
    public void createAddress(CreateAddressRequest addressRequest,Users user){
        Address address = addressMapper.toEntity(addressRequest);
        address.setUser(user);
        addressRepo.save(address);

    }
}
