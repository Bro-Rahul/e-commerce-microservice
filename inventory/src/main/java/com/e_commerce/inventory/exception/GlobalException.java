package com.e_commerce.inventory.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(InventoryNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleInventoryNotFoundException(InventoryNotFoundException ex){
        ApiErrorResponse err = new ApiErrorResponse();
        err.setMessage(ex.getMessage());
        err.setPath(ex.getPath());
        err.setStatus(400);
        return ResponseEntity.badRequest().body(err);
    }
}
