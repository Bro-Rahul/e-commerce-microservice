package com.e_commerce.inventory.model;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String productId;

    private String sku;

    private String name;

    private String stockDescription;

    private Double price;

    private Integer quantity;

    @ElementCollection
    private List<KeyValuePair> additionalFields;

}
