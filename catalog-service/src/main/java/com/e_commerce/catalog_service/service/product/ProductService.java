package com.e_commerce.catalog_service.service.product;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.catalog_service.dto.product.ProductCreationRequest;
import com.e_commerce.catalog_service.dto.product.ProductImageData;
import com.e_commerce.catalog_service.mappers.product.ProductMapper;
import com.e_commerce.catalog_service.model.Products;

import lombok.RequiredArgsConstructor;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ObjectMapper objectMapper;
    private final ProductMapper productMapper;
    // private final ProductRepo productRepo;

    public ResponseEntity<?> createProduct(
            ProductCreationRequest productRequest,
            List<ProductImageData> productImages,
            List<MultipartFile> files) {

        Map<String, Object> map = objectMapper.convertValue(
                productRequest.getMetaDetail(),
                new TypeReference<Map<String, Object>>() {
                });

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            String relative = "/uploads/" + file.getOriginalFilename();
            String filePath = System.getProperty("user.dir") + relative;
            try {
                file.transferTo(new File(filePath));
                productImages.get(i).setName(relative);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }

        map.put("productImages", productImages);

        Products product = productMapper.toEntity(productRequest);
        product.setMetaDetail(map);
        System.out.println(map);
        System.out.println(product.toString());

        return ResponseEntity.ok().body("Created");
    }

}
