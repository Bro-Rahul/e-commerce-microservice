package com.e_commerce.user_service.controller;

import com.e_commerce.user_service.dto.auth.RegisterUserDTO;
import com.e_commerce.user_service.dto.user.ListUserDTO;
import com.e_commerce.user_service.mapper.UserMapper;
import com.e_commerce.user_service.model.Users;
import com.e_commerce.user_service.repo.UsersRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserMapper mapper;
    private final UsersRepo usersRepo;

    @PostMapping("")
    public ResponseEntity<Users> greet(@Valid @RequestBody RegisterUserDTO accountCreation) {
        Users users = mapper.toEntity(accountCreation);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/list-users")
    public ResponseEntity<List<ListUserDTO>> listUsers() {
        List<Users> usersList = usersRepo.findAll();
        List<ListUserDTO> userDTOList = usersList.stream().map(mapper::toDTO).toList();
        return ResponseEntity.ok().body(userDTOList);

    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> deleteUser() {
        usersRepo.deleteById(9);
        return ResponseEntity.ok().body(true);
    }
}
