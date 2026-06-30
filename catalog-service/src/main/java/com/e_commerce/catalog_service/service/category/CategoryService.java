package com.e_commerce.catalog_service.service.category;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.e_commerce.catalog_service.dto.category.CreateCategoryRequest;
import com.e_commerce.catalog_service.dto.category.ListCategory;
import com.e_commerce.catalog_service.exception.category.CategoryAlreadyExistsException;
import com.e_commerce.catalog_service.exception.category.NoSuchCategoryExistsExpception;
import com.e_commerce.catalog_service.mappers.category.CategoryMapper;
import com.e_commerce.catalog_service.repo.CategoryRepo;

import jakarta.transaction.Transactional;

import com.e_commerce.catalog_service.model.Category;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepo categoryRepo;
    private final CategoryMapper categoryMapper;

    public ResponseEntity<List<ListCategory>> listAllCategory() {
        List<Category> data = categoryRepo.findAll();
        List<ListCategory> response = data.stream().map(item -> {
            return categoryMapper.toListDTO(item);
        }).toList();

        return ResponseEntity.ok().body(response);
    }

    @Transactional
    public ResponseEntity<ListCategory> createNewCategory(CreateCategoryRequest categoryRequest) {
        Optional<Category> optionalCategory = categoryRepo.findByCategoryNameIgnoreCase(categoryRequest.getName());
        if (optionalCategory.isPresent()) {
            throw new CategoryAlreadyExistsException("Category with this name is already exists");
        }
        Category category = new Category();
        category.setCategoryName(categoryRequest.getName());

        if (categoryRequest.getParentCategoryId() == null) {
            System.out.println("No Parent ");
            Category updatedCategory = categoryRepo.save(category);
            return ResponseEntity.ok().body(categoryMapper.toListDTO(updatedCategory));
        }
        System.out.println(categoryRequest.getParentCategoryId() + " parent Id");

        Optional<Category> parentCategory = categoryRepo.findById(categoryRequest.getParentCategoryId());
        if (parentCategory.isEmpty()) {
            throw new NoSuchCategoryExistsExpception("No Such Parent Category exits with this id");
        }
        category.setParentCategory(parentCategory.get());
        Category updatedCategory = categoryRepo.save(category);
        return ResponseEntity.ok().body(categoryMapper.toListDTO(updatedCategory));
    }
}
