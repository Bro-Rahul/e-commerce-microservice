package com.e_commerce.catalog.services.admin;

import com.e_commerce.catalog.dto.category.CategoryResponse;
import com.e_commerce.catalog.dto.category.CreateCategoryRequest;
import com.e_commerce.catalog.dto.category.UpdateCategoryRequest;
import com.e_commerce.catalog.exceptions.category.CategoryAlreadyExistsException;
import com.e_commerce.catalog.exceptions.category.CategoryNotFoundException;
import com.e_commerce.catalog.mapper.category.CategoryMapper;
import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.repo.CategoryRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminCategoryService {

    private final CategoryRepo categoryRepo;
    private final CategoryMapper mapper;


    @Transactional
    public ResponseEntity<?> createCategory(CreateCategoryRequest categoryRequest){
        Optional<Category> optionalCategory = categoryRepo.findByNameIgnoreCase(categoryRequest.getName());
        if(optionalCategory.isPresent())
            throw
                new CategoryAlreadyExistsException(
                        String.format("Category with name %s already exits",categoryRequest.getName()),
                        "Category_Already_Exits",
                        "/catalog/admin/category"
                );

        Category category = new Category();
        category.setName(categoryRequest.getName());
        if(categoryRequest.getParentCategoryName() != null){
            Optional<Category> parentCategoryOptional = categoryRepo.findByNameIgnoreCase(categoryRequest.getParentCategoryName());
            if(parentCategoryOptional.isEmpty())
                throw new CategoryNotFoundException(
                        String.format("Parent Category with name %s does not exits",categoryRequest.getParentCategoryName()),
                        "CATEGORY_NOT_FOUND",
                        "/catalog/admin/category"
                );

            category.setParentCategoryId(categoryRequest.getParentCategoryName());
            categoryRepo.save(category);
            return ResponseEntity.status(201).build();
        }
        categoryRepo.save(category);
        return ResponseEntity.status(201).build();
    }


    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryRepo.findAll().stream().map(mapper::toDTO).toList());
    }

    @Transactional
    public ResponseEntity<?> updateCategory(String id, @Valid UpdateCategoryRequest updateCategoryRequest) {
        Optional<Category> optionalCategory = categoryRepo.findById(id);
        if(optionalCategory.isEmpty())
            throw new CategoryNotFoundException(
                    String.format("Category with id %s does not exits",id),
                    "CATEGORY_NOT_FOUND",
                    "/catalog/admin/category"
            );

        Category category = optionalCategory.get();
        category.setName(updateCategoryRequest.getName());
        categoryRepo.save(category);
        return ResponseEntity.ok(mapper.toDTO(category));
    }
}
