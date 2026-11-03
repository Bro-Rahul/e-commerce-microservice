package com.e_commerce.catalog.services.admin;

import com.e_commerce.catalog.dto.category.CreateCategoryRequest;
import com.e_commerce.catalog.exceptions.category.CategoryAlreadyExistsException;
import com.e_commerce.catalog.exceptions.category.CategoryNotFoundException;
import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Service
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminCategoryCommandService {

    private final CategoryRepo categoryRepo;


    @Transactional
    public ResponseEntity<?> createCategory(CreateCategoryRequest categoryRequest){
        Boolean isPresent = categoryRepo
            .existsByNameIgnoreCase(categoryRequest.getName());

        if(isPresent!=null && isPresent){
            throw new CategoryAlreadyExistsException(
                    String.format("Category with name %s already exits"
                            ,categoryRequest.getName()),
                    "Category_Already_Exits",
                    "/catalog/admin/category"
            );
        }

        Category category = new Category();
        category.setName(categoryRequest.getName().toLowerCase());
        category.setDescription(category.getDescription());
        if(categoryRequest.getParentCategoryName() != null && !categoryRequest.getParentCategoryName().isEmpty()){
            Category parentCategory = categoryRepo
                .findByNameIgnoreCase(categoryRequest.getParentCategoryName())
                .orElseThrow(()->
                            new CategoryNotFoundException(
                            String.format("Parent Category with name %s does not exits",categoryRequest.getParentCategoryName()),
                            "CATEGORY_NOT_FOUND",
                            "/catalog/admin/category"
                        ));
            category.setParentCategory(parentCategory);
            List<String> parentCategories = new ArrayList<>(List.of(parentCategory.getName()));
            if(!parentCategory.getParentCategories().isEmpty()){
                parentCategories.addAll(parentCategory.getParentCategories());
            }
            category.setParentCategories(parentCategories);
            categoryRepo.save(category);
            return ResponseEntity.status(201).build();
        }
        categoryRepo.save(category);
        return ResponseEntity.status(201).build();
    }
}
