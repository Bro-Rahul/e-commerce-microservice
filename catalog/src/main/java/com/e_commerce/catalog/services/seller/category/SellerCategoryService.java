package com.e_commerce.catalog.services.seller.category;

import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerCategoryService {

    private final CategoryRepo categoryRepo;

    public Optional<Category> isCategoryPresent(String categoryName) {
        return categoryRepo.findByNameIgnoreCase(categoryName);
    }

}
