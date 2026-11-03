package com.e_commerce.catalog.services.admin;

import com.e_commerce.catalog.dto.category.CategoryNames;
import com.e_commerce.catalog.dto.category.HierarchyCategoryResponse;
import com.e_commerce.catalog.mapper.category.CategoryMapper;
import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminCategoryQueryService {

    private final CategoryRepo categoryRepo;
    private final CategoryMapper mapper;

    public ResponseEntity<List<HierarchyCategoryResponse>> getAllCategories() {
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

    public ResponseEntity<List<CategoryNames>> getAllCategoryNames() {
        return ResponseEntity.ok(categoryRepo.findAllBy());
    }
}
