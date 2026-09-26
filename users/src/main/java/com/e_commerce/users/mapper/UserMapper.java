package com.e_commerce.users.mapper;

import com.e_commerce.users.dto.user.CreateUserRequest;
import com.e_commerce.users.dto.user.UserResponseDTO;
import com.e_commerce.users.model.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "address",ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "accountStatus", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "sellerProfile", ignore = true)
    Users toEntity(CreateUserRequest createUserRequest);


    UserResponseDTO toResponse(Users user);

}
