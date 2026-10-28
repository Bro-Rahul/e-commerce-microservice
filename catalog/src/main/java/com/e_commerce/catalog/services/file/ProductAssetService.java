package com.e_commerce.catalog.services.file;


import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.dto.assets.SavedAssetsDTO;
import com.e_commerce.catalog.exceptions.products.ProductCoverImageRequiredException;
import com.e_commerce.catalog.model.ImageType;
import com.e_commerce.commons.dto.product.ProductMediaAssets;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductAssetService {

    private final FileService fileService;


    public SavedAssetsDTO saveProductImages(
            int variantId,
            List<AssetsMetaDetails> variantImage,
            List<MultipartFile> images) {

        List<MultipartFile> carouselImage = variantImage.stream()
                .filter(item -> item.getType() == ImageType.CarouselImages)
                .map(image -> images.get(image.getIndex()))
                .toList();

        List<MultipartFile> imageDisplay = variantImage.stream()
                .filter(item -> item.getType() == ImageType.CollectionImages)
                .map(image -> images.get(image.getIndex()))
                .toList();

        MultipartFile coverImage = variantImage.stream()
                .filter(item -> item.getType() == ImageType.CoverImage)
                .map(image -> images.get(image.getIndex()))
                .findFirst()
                .orElseThrow(() -> new ProductCoverImageRequiredException(
                        String.format(
                                "Cover image must be provided for variant %d",
                                variantId
                        ),
                        "/seller/product",
                        "Cover_Image_Not_Provided"
                ));

        List<String> carouselURL = fileService.storeAll(carouselImage);

        List<String> imageDisplayURL = fileService.storeAll(imageDisplay);

        String coverImageURL = fileService.store(coverImage);

        return new SavedAssetsDTO(
                carouselURL,
                imageDisplayURL,
                coverImageURL
        );
    }

    public void deleteImages(List<String> imageUrls){
        fileService.deleteAll(imageUrls);
    }

    public String storeCoverImage(String previousCoverImage,MultipartFile coverImage){
        fileService.delete(previousCoverImage);
        return fileService.store(coverImage);
    }


    public List<String> storeOtherImages(List<String> oldImages,List<MultipartFile> newImages){
        if(!oldImages.isEmpty()) deleteImages(oldImages);
        return fileService.storeAll(newImages);
    }
}
