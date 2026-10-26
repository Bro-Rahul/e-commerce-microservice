package com.e_commerce.catalog.controllers.admin;

import com.e_commerce.catalog.dto.category.CategoryResponse;
import com.e_commerce.catalog.dto.category.CreateCategoryRequest;
import com.e_commerce.catalog.dto.category.UpdateCategoryRequest;
import com.e_commerce.catalog.services.admin.AdminCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminCategoryController {

    private final AdminCategoryService adminCategoryService;

    @GetMapping("/category")
    public ResponseEntity<List<CategoryResponse>> getAllCategories(){
        return adminCategoryService.getAllCategories();
    }

    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CreateCategoryRequest categoryRequest){
        return adminCategoryService.createCategory(categoryRequest);
    }

    @PatchMapping("/category/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable String id, @Valid @RequestBody UpdateCategoryRequest updateCategoryRequest){
        return adminCategoryService.updateCategory(id,updateCategoryRequest);
    }

}
