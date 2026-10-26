package com.e_commerce.catalog.exceptions.category;

import lombok.Data;

@Data
public class CategoryAlreadyExistsException extends RuntimeException{

    private String code;
    private String path;


    public CategoryAlreadyExistsException(String message,String code,String path){
        super(message);
        this.code = code;
        this.path = path;
    }
}
