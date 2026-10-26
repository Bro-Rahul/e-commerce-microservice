package com.e_commerce.catalog.exceptions.products;

import lombok.Data;

@Data
public class ProductCoverImageRequiredException extends RuntimeException{

    private String code;
    private String path;

    public ProductCoverImageRequiredException(String message,String path,String code){
        super(message);
        this.code = code;
        this.path = path;
    }

}
