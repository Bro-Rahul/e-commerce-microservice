package com.e_commerce.catalog_service.exception.category;

public class NoSuchCategoryExistsExpception extends RuntimeException {

    public NoSuchCategoryExistsExpception(String message) {
        super(message);
    }
}
