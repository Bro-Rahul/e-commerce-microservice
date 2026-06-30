package com.e_commerce.user_service.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Map<String,String>> handleUserNotFound(UsernameNotFoundException ex){
        Map<String,String> errors = new HashMap<>();
        errors.put("error",ex.getMessage());
        return ResponseEntity.badRequest().body(errors);
    }
}
