package com.e_commerce.catalog.controllers.seller;

import com.e_commerce.catalog.dto.CreateCategoryRequest;
import com.e_commerce.catalog.model.ProductCategory;
import com.e_commerce.catalog.services.seller.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@AllArgsConstructor
public class ProductCategoryController {

    private final ProductService service;

    @GetMapping("/")
    public ResponseEntity<List<ProductCategory>> getAllCategory(){
        return service.getAllCategory();
    }

    @PostMapping("/")
    public void createNewCategory(@Valid CreateCategoryRequest createCategoryRequest){
        service.createCategory(createCategoryRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable String id){
        service.deleteCategory(id);
    }
}
