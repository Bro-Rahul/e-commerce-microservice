package com.e_commerce.catalog.controllers.seller.product;

import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.services.seller.product.SellerProductCommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerProductCommandController {

    private final SellerProductCommandService productService;


    @PostMapping("/product")
    public ResponseEntity<?> createProduct(
            @RequestPart("category") String category,
            @RequestPart("variants") List<ProductCreationRequest> productVariants,
            @RequestPart("images") List<MultipartFile> images,
            @RequestPart("imageMetaDetail") List<AssetsMetaDetails> imageDetail
            ){
        return productService.createProduct(category,productVariants,images,imageDetail);
    }

}
