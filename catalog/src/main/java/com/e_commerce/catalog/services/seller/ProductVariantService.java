package com.e_commerce.catalog.services.seller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.catalog.dto.product.AssetsMetaDetails;
import com.e_commerce.catalog.dto.product.ProductCreationRequest;
import com.e_commerce.catalog.mapper.productVariants.ProductVariantsMapper;
import com.e_commerce.catalog.model.ImageType;
import com.e_commerce.catalog.model.ProductMediaAssets;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.catalog.repo.ProductVariantsRepo;
import com.e_commerce.catalog.services.file.FileService;

import lombok.RequiredArgsConstructor;

@SuppressWarnings("unused")
@Service
@RequiredArgsConstructor
public class ProductVariantService {

    private final ProductVariantsRepo variantsRepo;
    private final ProductVariantsMapper productVariantsMapper;
    private final FileService fileService;

    public List<ProductsVariants> addProductVariants(
            List<ProductCreationRequest> productCreationRequests,
            List<MultipartFile> imageFiles,
            List<AssetsMetaDetails> imageDetails,
            Products products) {

        Map<Integer, List<AssetsMetaDetails>> imagesByIndex = imageDetails.stream()
                .collect(Collectors.groupingBy(AssetsMetaDetails::getVariantId));

        List<ProductsVariants> variants = new ArrayList<>();
        for (int i = 0; i < productCreationRequests.size(); i++) {
            var variantImages = imagesByIndex.getOrDefault(i + 1, List.of());
            var imagesTypes = variantImages.stream().collect(Collectors.groupingBy(AssetsMetaDetails::getType));

            var carouselImagesAssets = imagesTypes.getOrDefault(ImageType.Carousel, List.of());
            var displayImageAssets = imagesTypes.getOrDefault(ImageType.ImageCollection, List.of());
            var coverImageAssets = imagesTypes.getOrDefault(ImageType.CoverImage, List.of());

            if (coverImageAssets.isEmpty())
                throw new RuntimeException("Cover Image of variant " + i + 1 + " is not provided");

            var coverImage = imageFiles.get(coverImageAssets.get(0).getIndex());
            var displayImage = displayImageAssets.stream().map(item -> imageFiles.get(item.getIndex())).toList();
            var carouselImages = carouselImagesAssets.stream().map(item -> imageFiles.get(item.getIndex())).toList();

            List<String> carouselImagesUrl = fileService.storeAll(carouselImages);
            List<String> displayImagesUrl = fileService.storeAll(displayImage);
            String coverImageURL = fileService.store(coverImage);

            ProductMediaAssets assets = new ProductMediaAssets(carouselImagesUrl, displayImagesUrl);
            ProductsVariants variant = productVariantsMapper.toEntity(
                    productCreationRequests.get(i),
                    products.getId()
            );
            variant.setCoverImageURL(coverImageURL);
            variant.setAssets(assets);
            variants.add(variant);
        }

        return variantsRepo.saveAll(variants);

    }
}
