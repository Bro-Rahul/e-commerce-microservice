package com.e_commerce.catalog.services.seller.category;

import com.e_commerce.catalog.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerCategoryService {

    private final CategoryRepo categoryRepo;

    public boolean isCategoryPresent(String categoryName){
        return categoryRepo.existsByNameIgnoreCase(categoryName);
    }

}
