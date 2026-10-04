package com.e_commerce.catalog.dto.product;

import com.fasterxml.jackson.annotation.JsonAlias;
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

    @JsonAlias("about")
    private String aboutItem;


}
