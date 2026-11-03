package com.e_commerce.catalog.controllers.seller.category;

import com.e_commerce.catalog.dto.category.HierarchyCategoryResponse;
import com.e_commerce.catalog.services.seller.category.SellerCategoryQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/seller")
@RequiredArgsConstructor
public class SellerCategoryQueryController {

    private final SellerCategoryQueryService service;

    @GetMapping("/category")
    public ResponseEntity<List<HierarchyCategoryResponse>> getAvailableCategory(){
        return service.getCategoryList();
    }

}
