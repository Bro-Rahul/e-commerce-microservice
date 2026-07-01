package com.e_commerce.catalog_service.validators.product;

import java.util.Map;

public interface ValidatorStrategy {

    boolean isValid(Map<String, Object> entity);

    Map<String, String> getValidationError();
}
