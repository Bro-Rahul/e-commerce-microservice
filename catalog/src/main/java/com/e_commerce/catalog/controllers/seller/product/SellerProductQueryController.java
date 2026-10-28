package com.e_commerce.catalog.controllers.seller.product;

import com.e_commerce.catalog.dto.product.seller.ProductResponseDTO;
import com.e_commerce.catalog.services.seller.product.SellerProductQueryService;
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
public class SellerProductQueryController {

    private final SellerProductQueryService queryService;

    @GetMapping("/product")
    public ResponseEntity<List<ProductResponseDTO>> getProducts(){
        return queryService.getAllProduct();
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductResponseDTO>> getProduct(@PathVariable String productId){
        return queryService.getProduct(productId);
    }
}
