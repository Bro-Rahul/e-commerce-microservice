package com.e_commerce.catalog.services.seller.product;

import com.e_commerce.catalog.dto.product.seller.ProductResponseDTO;
import com.e_commerce.catalog.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerProductQueryService {


    private final ProductRepo productRepo;

    public ResponseEntity<List<ProductResponseDTO>> getAllProduct(){
        return ResponseEntity.ok(productRepo.findAllBy());
    }

    public ResponseEntity<List<ProductResponseDTO>> getProduct(String productId) {
        return ResponseEntity.ok(productRepo.findBy(productId));
    }
}
