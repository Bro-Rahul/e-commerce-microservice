package com.e_commerce.catalog.services.seller.variant;

import com.e_commerce.catalog.dto.assets.SavedAssetsDTO;
import com.e_commerce.catalog.dto.product.seller.ProductBaseDetailsDTO;
import com.e_commerce.catalog.exceptions.products.ProductNotFoundException;
import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.catalog.repo.ProductVariantsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SellerProductVariantQueryService {

    private final ProductVariantsRepo variantsRepo;

    public ResponseEntity<ProductBaseDetailsDTO> getVariantBaseDetail(String variantId){
        return ResponseEntity.ok().body(variantsRepo.getVariantById(variantId));
    }

    public ResponseEntity<List<ProductBaseDetailsDTO>> listAllVariants() {
        return ResponseEntity.ok(variantsRepo.findAllBy());
    }

    public ResponseEntity<?> getMediaAssets(String variantId) {
        Optional<ProductsVariants> optionalVariant = variantsRepo.findByVariantId(variantId);
        SavedAssetsDTO assetsDTO = new SavedAssetsDTO();
        if(optionalVariant.isEmpty())
            throw new ProductNotFoundException("No Such product Variant Exits","VARIANT_NOT_FOUND","/seller/product-variant/{id}/assets");

        ProductsVariants variants = optionalVariant.get();
        assetsDTO.setCarouselImages(variants.getAssets().getCarouselImages());
        assetsDTO.setImageCollections(variants.getAssets().getImageCollections());
        assetsDTO.setCoverImage(variants.getCoverImageURL());

        return ResponseEntity.ok(assetsDTO);
    }

    public ResponseEntity<?> getVariantMetaDetail(String variantId) {
        Optional<ProductsVariants> optionalVariant = variantsRepo.findByVariantId(variantId);
        if(optionalVariant.isEmpty())
            throw new ProductNotFoundException("No Such product Variant Exits","VARIANT_NOT_FOUND","/seller/product-variant/{id}/meta-detail");
        ProductsVariants variants = optionalVariant.get();
        var response = variants.getMetaDetails();
        response.put("category",variants.getCategory().getName());
        return ResponseEntity.ok(variants.getMetaDetails());
    }
}
