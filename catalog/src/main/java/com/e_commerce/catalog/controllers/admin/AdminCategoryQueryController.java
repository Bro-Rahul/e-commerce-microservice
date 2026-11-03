package com.e_commerce.catalog.controllers.admin;

import com.e_commerce.catalog.dto.category.CategoryNames;
import com.e_commerce.catalog.dto.category.HierarchyCategoryResponse;
import com.e_commerce.catalog.services.admin.AdminCategoryQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminCategoryQueryController {

    private final AdminCategoryQueryService service;

    @GetMapping("/category")
    public ResponseEntity<List<HierarchyCategoryResponse>> getAllCategories(){
        return service.getAllCategories();
    }

    @GetMapping("/category/names")
    public ResponseEntity<List<CategoryNames>> getCategoriesName(){
        return service.getAllCategoryNames();
    }

}
