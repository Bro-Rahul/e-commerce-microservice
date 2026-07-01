package com.e_commerce.catalog_service.controller.seller;

import com.e_commerce.catalog_service.service.product.ProductService;
import com.e_commerce.catalog_service.validators.product.ValidatorFactory;
import com.e_commerce.catalog_service.validators.product.ValidatorStrategy;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.catalog_service.dto.product.ProductBaseRequest;
import com.e_commerce.catalog_service.dto.product.ProductImageData;
import com.e_commerce.catalog_service.dto.product.ProductInStockRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ValidatorFactory validatorFactory;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> createNewProduct(
            @Valid @RequestPart("productBase") ProductBaseRequest productRequest,
            @Valid @RequestPart("productStock") ProductInStockRequest productInStockRequest,
            @RequestPart("productImage") List<ProductImageData> productImages,
            @RequestPart("images") List<MultipartFile> files,
            Authentication authentication) {

        String category = productRequest.getCategory();
        ValidatorStrategy productValidator = validatorFactory.getStrategy(category);
        if (!productValidator.isValid(productRequest.getMetaDetail())) {
            return ResponseEntity.badRequest().body(productValidator.getValidationError());
        }
        Map<String, Object> productMeta = new HashMap<>();
        productMeta.put("attribute", productRequest.getMetaDetail());
        productMeta.put("productImages", productImages);
        productMeta.put("specifications", productRequest.getMetaDetail().get("specifications"));

        System.out.println(productInStockRequest);
        return ResponseEntity.ok().body("Created");
    }

}