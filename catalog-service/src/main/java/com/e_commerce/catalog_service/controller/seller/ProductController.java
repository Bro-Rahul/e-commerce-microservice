package com.e_commerce.catalog_service.controller.seller;

import com.e_commerce.catalog_service.service.product.ProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.catalog_service.dto.product.ProductCreationRequest;
import com.e_commerce.catalog_service.dto.product.ProductImageData;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    // @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> createNewProduct(
            @Valid @RequestPart("productBase") ProductCreationRequest productRequest,
            // @Valid @RequestPart("productStock") ProductInStockRequest
            // productInStockRequest,
            @RequestPart("productImage") List<ProductImageData> productImages,
            @RequestPart("images") List<MultipartFile> files,
            Authentication authentication) {

        return productService.createProduct(productRequest, productImages, files);
    }

}