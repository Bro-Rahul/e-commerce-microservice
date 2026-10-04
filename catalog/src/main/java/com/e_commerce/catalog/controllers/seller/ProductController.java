package com.e_commerce.catalog.controllers.seller;

import com.e_commerce.catalog.dto.product.ProductBaseDetail;
import com.e_commerce.catalog.dto.product.ProductInventoryRequest;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.repo.ProductRepo;
import com.e_commerce.catalog.services.seller.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Products> createProduct(
            @RequestPart("metaDetails") Map<String, Object> metaDetails,
            @RequestPart("productBaseDetail") ProductBaseDetail productBaseDetail,
            @RequestPart("inventory") List<ProductInventoryRequest> inventoryRequest,
            @RequestPart("coverImage") MultipartFile coverImage,
            @RequestPart(value = "imageCollection", required = false) List<MultipartFile> imageCollection,
            @RequestPart(value = "carouselImages", required = false) List<MultipartFile> carouselImages) {
        Products product = productService.createProduct(
                metaDetails,
                productBaseDetail,
                inventoryRequest,
                coverImage,
                imageCollection,
                carouselImages);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
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