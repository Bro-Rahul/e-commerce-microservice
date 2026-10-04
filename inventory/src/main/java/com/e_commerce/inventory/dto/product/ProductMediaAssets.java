package com.e_commerce.inventory.dto.product;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductMediaAssets {
    private List<String> carouselImages;

    private List<String> imageCollections;

}
