package com.e_commerce.users.mapper;

import com.e_commerce.users.dto.address.CreateAddressRequest;
import com.e_commerce.users.model.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    @Mapping(target = "id",ignore = true)
    Address toEntity(CreateAddressRequest addressRequest);
}
