package com.e_commerce.commons.dto.product;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductMediaAssets {

    private List<String> carouselImages;
    private List<String> imageCollections;
}