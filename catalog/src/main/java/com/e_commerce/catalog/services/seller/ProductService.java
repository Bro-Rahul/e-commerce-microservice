package com.e_commerce.catalog.services.seller;

import com.e_commerce.catalog.dto.CreateCategoryRequest;
import com.e_commerce.catalog.model.ProductCategory;
import com.e_commerce.catalog.repo.ProductCategoryRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductCategoryRepo repo;


    public ResponseEntity<List<ProductCategory>> getAllCategory(){
        return ResponseEntity.ok().body(repo.findAll());
    }

    @Transactional
    public void createCategory(CreateCategoryRequest createCategoryRequest){
        ProductCategory newCategory = new ProductCategory();
        newCategory.setName(createCategoryRequest.getName());
        Optional<ProductCategory> category = repo.findByNameIgnoreCase(createCategoryRequest.getName()) ;
        if(category.isPresent()) throw new RuntimeException("Category with this name already exits ");

        if(createCategoryRequest.getParentCategoryId()!=null){
            newCategory.setParentCategoryId(createCategoryRequest.getParentCategoryId());
        }

        repo.save(newCategory);
        return;

    }

    @Transactional
    public void delete(String categoryId) {

        List<ProductCategory> children =
                repo.findByParentCategoryId(categoryId);

        for (ProductCategory child : children) {
            delete(child.getId());
        }

        repo.deleteById(categoryId);
    }

    public void deleteCategory(String id){
        delete(id);
    }

}
