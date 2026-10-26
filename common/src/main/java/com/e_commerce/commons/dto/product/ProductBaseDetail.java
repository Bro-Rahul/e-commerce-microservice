package com.e_commerce.commons.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductBaseDetail {

    private String category;

    private String title;

    private String description;

    private String about;

}