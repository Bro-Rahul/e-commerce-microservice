package com.e_commerce.catalog_service.validators.product;

import org.springframework.stereotype.Component;
import com.e_commerce.catalog_service.exception.category.NoSuchCategoryExistsExpception;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ValidatorFactory {

    private final PhoneValidator phoneValidator;

    public ValidatorStrategy getStrategy(String category) {
        return switch (category.toUpperCase()) {
            case "PHONES" -> phoneValidator;
            default -> throw new NoSuchCategoryExistsExpception(
                    "Unsupported category");
        };
    }
}
