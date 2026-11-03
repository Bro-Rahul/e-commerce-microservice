package com.e_commerce.catalog.controllers.admin;

import com.e_commerce.catalog.dto.category.CreateCategoryRequest;
import com.e_commerce.catalog.services.admin.AdminCategoryCommandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminCategoryCommandController {

    private final AdminCategoryCommandService service;

    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CreateCategoryRequest categoryRequest){
        return service.createCategory(categoryRequest);
    }
}
