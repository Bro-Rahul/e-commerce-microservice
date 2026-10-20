package com.e_commerce.search.controller;

import com.e_commerce.search.dto.product.SellerProduct;
import com.e_commerce.search.dto.search.PaginatedResponse;
import com.e_commerce.search.dto.search.SearchFilter;
import com.e_commerce.search.services.search.SellerSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
    @RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerController {

    private final SellerSearch sellerSearch;

    @PostMapping("/products")
    public ResponseEntity<PaginatedResponse<SellerProduct>> getSellerProducts(
            @RequestBody SearchFilter searchFilter
    ){
        System.out.println(searchFilter.toString());
        Pageable pageable = PageRequest.of(Integer.parseInt(searchFilter.getPage()),Integer.parseInt(searchFilter.getPageSize()));
        return ResponseEntity.ok(sellerSearch.getProducts(searchFilter,pageable));
    }
}
