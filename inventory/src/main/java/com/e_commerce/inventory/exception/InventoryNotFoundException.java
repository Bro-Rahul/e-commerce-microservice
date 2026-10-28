package com.e_commerce.inventory.exception;

import lombok.Data;

@Data
public class InventoryNotFoundException extends RuntimeException{

    private String code;
    private String path;

    public InventoryNotFoundException(String message,String path,String code){
        super(message);
        this.code = code;
        this.path = path;
    }
}
