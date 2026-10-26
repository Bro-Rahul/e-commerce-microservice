package com.e_commerce.catalog.exceptions.category;

import lombok.Data;

@Data
public class CategoryNotFoundException extends RuntimeException{

    private String code;
    private String path;


    public CategoryNotFoundException(String message,String code,String path){
        super(message);
        this.code = code;
        this.path = path;
    }
}
