package com.e_commerce.user_service.mapper;

import com.e_commerce.user_service.dto.auth.LoginResponseDTO;
import com.e_commerce.user_service.dto.auth.RegisterUserDTO;
import com.e_commerce.user_service.dto.user.ListUserDTO;
import com.e_commerce.user_service.model.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    Users toEntity(RegisterUserDTO request);

    ListUserDTO toDTO(Users user);
    LoginResponseDTO toLoginResponse(Users user);
}
