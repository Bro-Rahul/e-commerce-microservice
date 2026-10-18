package com.e_commerce.search.controller;

import com.e_commerce.search.dto.product.SellerProduct;
import com.e_commerce.search.dto.search.SearchFilter;
import com.e_commerce.search.services.search.SellerSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
    @RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerController {

    private final SellerSearch sellerSearch;

    @PostMapping("/products")
    public ResponseEntity<List<SellerProduct>> getSellerProducts(@RequestBody SearchFilter searchFilter){
        System.out.println(searchFilter.toString());
        return ResponseEntity.ok(sellerSearch.getProducts(searchFilter));
    }
}
