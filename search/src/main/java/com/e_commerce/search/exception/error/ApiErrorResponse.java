package com.e_commerce.search.exception.error;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
public class ApiErrorResponse {

    public ApiErrorResponse(){
        this.createdAt = LocalDateTime.now();
    }

    private String message;

    private Integer status;

    private String path;

    private LocalDateTime createdAt;

    private Map<String,String> errors;
}
