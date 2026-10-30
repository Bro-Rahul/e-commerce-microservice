package com.e_commerce.search.exception.product;

import lombok.Data;

@Data
public class ProductNotFoundException extends RuntimeException {
    private String code;
    private String path;

    public ProductNotFoundException(String message,String code,String path){
        super(message);
        this.code = code;
        this.path = path;
    }
}
