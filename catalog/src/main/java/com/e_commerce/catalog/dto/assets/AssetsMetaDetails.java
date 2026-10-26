package com.e_commerce.catalog.dto.assets;

import com.e_commerce.catalog.model.ImageType;
import lombok.Data;

@Data
public class AssetsMetaDetails {

    private Integer index;

    private String name;

    private ImageType type;

    private Boolean isCoverImage;

    private Integer variantId;
}