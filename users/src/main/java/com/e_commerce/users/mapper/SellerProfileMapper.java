package com.e_commerce.users.mapper;

import com.e_commerce.users.dto.user.SellerProfileDTO;
import com.e_commerce.users.model.SellerProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SellerProfileMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "userId",ignore = true)
    SellerProfile toEntity(SellerProfileDTO profileDTO);
}
