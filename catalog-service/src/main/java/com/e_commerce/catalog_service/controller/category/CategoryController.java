package com.e_commerce.catalog_service.controller.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.e_commerce.catalog_service.dto.category.CreateCategoryRequest;
import com.e_commerce.catalog_service.dto.category.ListCategory;
import com.e_commerce.catalog_service.service.category.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<List<ListCategory>> listCategory() {
        return categoryService.listAllCategory();
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ListCategory> postMethodName(@Valid @RequestBody CreateCategoryRequest categoryRequest) {
        return categoryService.createNewCategory(categoryRequest);
    }

}
