package com.e_commerce.catalog.dto.product;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VariantsMetaDetails {

    private String id;

    private Map<String, String> details;
}
