package com.e_commerce.catalog.exceptions;

import com.e_commerce.catalog.dto.error.ApiErrorResponse;
import com.e_commerce.catalog.exceptions.category.CategoryAlreadyExistsException;
import com.e_commerce.catalog.exceptions.category.CategoryNotFoundException;
import com.e_commerce.catalog.exceptions.products.ProductCoverImageRequiredException;
import com.e_commerce.catalog.exceptions.products.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalException {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        ApiErrorResponse err = new ApiErrorResponse();
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.putIfAbsent(
                        error.getField(),
                        error.getDefaultMessage()
                )
        );
        err.setMessage("Validation Error");
        err.setErrors(errors);
        err.setStatus(ex.getStatusCode().value());
        err.setPath(ex.getNestedPath());
        return ResponseEntity.badRequest().body(err);
    }

    @ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<ApiErrorResponse> handleCategoryAlreadyExistsException(CategoryAlreadyExistsException ex){
        ApiErrorResponse err = new ApiErrorResponse();
        err.setMessage(ex.getMessage());
        err.setPath(ex.getPath());
        err.setStatus(400);

        return ResponseEntity.badRequest().body(err);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleCategoryNotFoundException(CategoryNotFoundException ex){
        ApiErrorResponse err = new ApiErrorResponse();
        err.setMessage(ex.getMessage());
        err.setPath(ex.getPath());
        err.setStatus(400);
        return ResponseEntity.badRequest().body(err);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleProductNotFoundException(ProductNotFoundException ex){
        ApiErrorResponse err = new ApiErrorResponse();
        err.setMessage(ex.getMessage());
        err.setPath(ex.getPath());
        err.setStatus(400);
        return ResponseEntity.badRequest().body(err);
    }

    @ExceptionHandler(ProductCoverImageRequiredException.class)
    public ResponseEntity<ApiErrorResponse> handleProductCoverImageRequiredException(ProductCoverImageRequiredException ex){
        ApiErrorResponse err = new ApiErrorResponse();
        err.setMessage(ex.getMessage());
        err.setPath(ex.getPath());
        err.setStatus(400);
        return ResponseEntity.badRequest().body(err);
    }

}
