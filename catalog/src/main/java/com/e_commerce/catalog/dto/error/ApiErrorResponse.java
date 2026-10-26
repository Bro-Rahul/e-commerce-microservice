package com.e_commerce.catalog.dto.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
