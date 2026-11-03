package com.e_commerce.catalog.repo;

import com.e_commerce.catalog.dto.category.CategoryNames;
import com.e_commerce.catalog.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category, String> {

    Boolean existsByNameIgnoreCase(String name);

    Optional<Category> findByNameIgnoreCase(String name);

    List<CategoryNames> findAllBy();
}
