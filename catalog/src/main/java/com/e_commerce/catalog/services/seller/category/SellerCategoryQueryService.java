package com.e_commerce.catalog.services.seller.category;

import com.e_commerce.catalog.dto.category.CategoryResponse;
import com.e_commerce.catalog.dto.category.HierarchyCategoryResponse;
import com.e_commerce.catalog.mapper.category.CategoryMapper;
import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerCategoryQueryService {

    private final CategoryRepo categoryRepo;

    public Optional<Category> isCategoryPresent(String categoryName) {
        return categoryRepo.findByNameIgnoreCase(categoryName);
    }


    public ResponseEntity<List<HierarchyCategoryResponse>> getCategoryList() {

        List<Category> categories = categoryRepo.findAll();

        Map<String, HierarchyCategoryResponse> categoryMap = new HashMap<>();

        List<HierarchyCategoryResponse> rootCategories = new ArrayList<>();

        // Create DTOs
        for (Category category : categories) {

            HierarchyCategoryResponse dto = new HierarchyCategoryResponse(category.getName());

            categoryMap.put(category.getName(), dto);
        }

        // Build hierarchy
        for (Category category : categories) {

            HierarchyCategoryResponse current =
                    categoryMap.get(category.getName());

            if (category.getParentCategory() == null) {

                rootCategories.add(current);

            } else {

                String parentName = category.getParentCategory().getName();

                HierarchyCategoryResponse parent =
                        categoryMap.get(parentName);

                if (parent != null) {
                    parent.getChildCategories().add(current);
                }
            }
        }

        return ResponseEntity.ok(rootCategories);
    }
}
