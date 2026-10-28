package com.e_commerce.catalog.controllers.seller.variant;

import com.e_commerce.catalog.dto.product.seller.ProductBaseDetailsDTO;
import com.e_commerce.catalog.services.seller.variant.SellerProductVariantQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerProductVariantQueryController {

    private final SellerProductVariantQueryService queryService;

    @GetMapping("/product-variant")
    public ResponseEntity<List<ProductBaseDetailsDTO>> getAllVariants(){
        return queryService.listAllVariants();
    }

    @GetMapping("/product-variant/{variantId}/base")
    public ResponseEntity<ProductBaseDetailsDTO> getVariantBaseDetail(@PathVariable String variantId){
        return queryService.getVariantBaseDetail(variantId);
    }

    @GetMapping("/product-variant/{variantId}/assets")
    public ResponseEntity<?> getVariantMediaAssets(@PathVariable String variantId){
        return queryService.getMediaAssets(variantId);
    }

    @GetMapping("/product-variant/{variantId}/meta-detail")
    public ResponseEntity<?> getProductMetaDetails(@PathVariable String variantId){
        return queryService.getVariantMetaDetail(variantId);
    }
}
