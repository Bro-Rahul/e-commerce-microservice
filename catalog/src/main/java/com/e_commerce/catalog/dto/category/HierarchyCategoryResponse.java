package com.e_commerce.catalog.dto.category;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class HierarchyCategoryResponse {

    private String name;
    private List<HierarchyCategoryResponse> childCategories;

    public HierarchyCategoryResponse(String category){
        this.name = category;
        this.childCategories = new ArrayList<>();
    }
}
