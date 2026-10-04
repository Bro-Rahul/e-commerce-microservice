package com.e_commerce.search.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.search.model.Products;
import com.e_commerce.search.repo.ProductRepo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepo repo;

    @GetMapping("/products")
    public List<Products> getAll() {
        var response = repo.findAll().iterator();
        List<Products> products = new ArrayList<>();
        while (response.hasNext()) {
            products.add(response.next());
        }

        return products;
    }

    @GetMapping("/product")
    public String getMethodName() {
        repo.deleteAll();
        return "deleted";
    }

}
