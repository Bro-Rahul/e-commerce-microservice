package com.e_commerce.users.controller.seller;

import com.e_commerce.users.service.seller.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seller")
@AllArgsConstructor
public class UserController {

    private final UserService userService ;

    @GetMapping("")
    public ResponseEntity<?> greet(){
        return userService.getAllUsers();
    }
}
