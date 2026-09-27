package com.e_commerce.users.service.seller;

import com.e_commerce.users.dto.user.SellerProfileDTO;
import com.e_commerce.users.mapper.SellerProfileMapper;
import com.e_commerce.users.model.SellerProfile;
import com.e_commerce.users.model.Users;
import com.e_commerce.users.repo.SellerProfileRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SellerProfileService {

    private final SellerProfileMapper sellerProfileMapper;
    private final SellerProfileRepo sellerProfileRepo;

    public void saveProfile(SellerProfileDTO sellerProfileDTO, Users user){
        SellerProfile profile = sellerProfileMapper.toEntity(sellerProfileDTO);
        profile.setUserId(user);
        sellerProfileRepo.save(profile);
    }
}
