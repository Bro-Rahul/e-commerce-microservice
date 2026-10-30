package com.e_commerce.search.exception;

import com.e_commerce.search.exception.error.ApiErrorResponse;
import com.e_commerce.search.exception.product.ProductNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleProductNotFoundException(ProductNotFoundException ex){
        ApiErrorResponse err = new ApiErrorResponse();
        err.setMessage(ex.getMessage());
        err.setPath(ex.getPath());
        err.setStatus(400);
        return ResponseEntity.badRequest().body(err);
    }

}
