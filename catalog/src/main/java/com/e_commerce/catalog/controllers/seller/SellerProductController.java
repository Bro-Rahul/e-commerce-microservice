package com.e_commerce.catalog.controllers.seller;

import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.dto.product.seller.SellerProductList;
import com.e_commerce.catalog.services.seller.product.SellerProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerProductController {

    private final SellerProductService productService;


    @PostMapping("/product")
    public ResponseEntity<?> createProduct(
            @RequestPart("category") String category,
            @RequestPart("variants") List<ProductCreationRequest> productVariants,
            @RequestPart("images") List<MultipartFile> images,
            @RequestPart("imageMetaDetail") List<AssetsMetaDetails> imageDetail
            ){
        return productService.createProduct(category,productVariants,images,imageDetail);
    }

    @GetMapping("/product")
    public ResponseEntity<List<SellerProductList>> getProducts(){
        return productService.getProductList();
    }
}
