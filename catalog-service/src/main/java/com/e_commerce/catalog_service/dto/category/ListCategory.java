package com.e_commerce.catalog_service.dto.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListCategory {

    private Long id;

    private String category;

    private Long parentCategory;
}
