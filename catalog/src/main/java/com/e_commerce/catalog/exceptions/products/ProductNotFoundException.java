package com.e_commerce.catalog.exceptions.products;

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
