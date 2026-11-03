package com.e_commerce.catalog.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Category {

    @Id
    private String name;

    private String description;

    @ManyToOne
    private Category parentCategory;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    List<String> parentCategories = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<ProductsVariants> variants;
}