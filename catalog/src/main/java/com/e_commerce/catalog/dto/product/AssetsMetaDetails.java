package com.e_commerce.catalog.dto.product;

import com.e_commerce.catalog.model.ImageType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssetsMetaDetails {

    private Integer index;

    private String name;

    private ImageType type;

    private Boolean isCoverImage;

    private Integer variantId;
}
