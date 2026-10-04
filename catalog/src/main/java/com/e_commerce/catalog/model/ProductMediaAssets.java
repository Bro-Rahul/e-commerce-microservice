package com.e_commerce.catalog.model;

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
