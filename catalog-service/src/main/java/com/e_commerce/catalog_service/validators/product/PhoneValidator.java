package com.e_commerce.catalog_service.validators.product;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.e_commerce.catalog_service.dto.product.phones.PhoneMetaDetailRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Data
@Component
@RequiredArgsConstructor
public class PhoneValidator implements ValidatorStrategy {

    private final Validator validator;
    private final Map<String, String> errors;
    private final ObjectMapper objectMapper;

    @Override
    public boolean isValid(Map<String, Object> entity) {
        PhoneMetaDetailRequest phoneRequest = objectMapper.convertValue(entity, PhoneMetaDetailRequest.class);

        Set<ConstraintViolation<PhoneMetaDetailRequest>> violationsErrors = validator.validate(phoneRequest);

        if (!violationsErrors.isEmpty()) {
            violationsErrors.forEach(error -> {
                this.errors.put(error.getPropertyPath().toString(), error.getMessage());
            });
        }
        return violationsErrors.isEmpty();
    }

    @Override
    public Map<String, String> getValidationError() {
        return errors;
    }

}