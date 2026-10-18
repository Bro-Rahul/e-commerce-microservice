package com.e_commerce.catalog.controllers.seller;

import com.e_commerce.catalog.dto.product.AssetsMetaDetails;
import com.e_commerce.catalog.dto.product.ProductBaseDetail;
import com.e_commerce.catalog.dto.product.ProductCreationRequest;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.repo.ProductRepo;
import com.e_commerce.catalog.services.seller.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/seller/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
public class ProductController {

    private final ProductService productService;
    private final ProductRepo repo;

    @GetMapping
    public List<Products> getMethodName() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestPart("variants") List<ProductCreationRequest> productVariants,
            @RequestPart("images") List<MultipartFile> images,
            @RequestPart("imageMetaDetail") List<AssetsMetaDetails> imageDetail) {

        return productService.createProduct(productVariants, images, imageDetail);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Products>> getProduct(@PathVariable String id) {
        return productService.getProducyById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable String id) {
        productService.deleteProductById(id);
    }

    @PatchMapping("/{id}/productBase")
    public void pathProductBaseDetails(@PathVariable String id, @RequestBody ProductBaseDetail productBaseDetail) {
        productService.pathchProductDetails(id, productBaseDetail);

    }

    @PatchMapping("/{id}/productMetaDetail")
    public void pathProductBaseDetails(@PathVariable String id, @RequestBody Map<String, Object> metaDetails) {
        productService.patchProductMetaDetail(id, metaDetails);

    }

    @PatchMapping("/{id}/assets")
    public void pathchProductAssets(@PathVariable String id,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestPart(value = "coverImage", required = false) List<MultipartFile> imageCollection,
            @RequestPart(value = "carouselImages", required = false) List<MultipartFile> carouselImages) {

        productService.patchProductAssets(id, coverImage, imageCollection, carouselImages);

    }

}