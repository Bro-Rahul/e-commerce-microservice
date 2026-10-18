package com.e_commerce.search.dto.search;

import com.e_commerce.search.model.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchFilter {
  private String category;
  private ProductStatus status;
  private String lastModified;
  private String productSearch;
}
