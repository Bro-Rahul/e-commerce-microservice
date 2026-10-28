package com.e_commerce.catalog.controllers.seller.variant;

import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.services.seller.variant.SellerProductVariantCommandService;
import com.e_commerce.commons.dto.product.ProductBaseDetail;
import com.e_commerce.commons.dto.product.ProductStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/seller/product-variant")
@RequiredArgsConstructor
public class SellerProductVariantCommandController {

    private final SellerProductVariantCommandService service;

    @PatchMapping("/{variantId}/base")
    public ResponseEntity<Void> updateProductBaseDetail(@PathVariable String variantId, @Valid @RequestBody ProductBaseDetail productBaseDetail){
        service.updateVariantBaseDetail(variantId,productBaseDetail);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{variantId}/meta-detail")
    public ResponseEntity<Void>  updateProductMetaDetails(@PathVariable String variantId, @Valid @RequestBody Map<String,Object> productMetaDetails){
        service.updateVariantMetaDetail(variantId,productMetaDetails);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{variantId}/status")
    public ResponseEntity<Void> updateProductVariantStatus(@PathVariable String variantId, @RequestBody ProductStatus status){
        service.updateVariantStatus(variantId,status);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{variantId}/assets")
    public ResponseEntity<Void> updateProductAssets(
            @PathVariable String variantId,
            @RequestPart("images") List<MultipartFile> images,
            @RequestPart("metaDetails") List<AssetsMetaDetails> metaDetails
    ){
        service.updateVariantAssets(variantId,images,metaDetails);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{variantId}")
    public ResponseEntity<Void> deleteProductVariant(@PathVariable String variantId){
        service.deleteProductVariant(variantId);
        return ResponseEntity.ok().build();
    }


}
