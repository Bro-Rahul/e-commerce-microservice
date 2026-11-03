package com.e_commerce.search.controller;

import com.e_commerce.search.services.search.SellerQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerQueryController {

    private final SellerQueryService sellerQueryService;

    @GetMapping("/products")
    public ResponseEntity<?> getFilterProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String searchText,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String createdAt,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "0") int page

    ){
        Pageable pageable = PageRequest.of(page,pageSize);
        return sellerQueryService.searchResults(category,searchText,status,createdAt,pageable);
    }
}
