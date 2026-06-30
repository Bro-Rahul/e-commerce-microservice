package com.e_commerce.catalog_service.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.e_commerce.catalog_service.exception.category.CategoryAlreadyExistsException;
import com.e_commerce.catalog_service.exception.category.NoSuchCategoryExistsExpception;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<?> handleCategoryAlreadyExists(
            CategoryAlreadyExistsException ex) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(NoSuchCategoryExistsExpception.class)
    public ResponseEntity<?> handleNoSuchCategoryExists(
            NoSuchCategoryExistsExpception ex) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return ResponseEntity.badRequest().body(errors);
    }
}