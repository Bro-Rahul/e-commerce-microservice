package com.e_commerce.catalog.dto.assets;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavedAssetsDTO {

    private List<String> carouselImages;
    private List<String> imageCollections;
    private String coverImage;
}
