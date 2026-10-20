package com.e_commerce.catalog.services.seller;

import com.e_commerce.catalog.dto.events.publisher.product.ProductCreatedEvent;
import com.e_commerce.catalog.dto.product.AssetsMetaDetails;
import com.e_commerce.catalog.dto.product.KeyValuePair;
import com.e_commerce.catalog.dto.product.ProductBaseDetail;
import com.e_commerce.catalog.dto.product.ProductCreationRequest;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.rabbitmq.EventPublisher;
import com.e_commerce.catalog.repo.ProductRepo;
import com.e_commerce.catalog.services.file.FileService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SuppressWarnings("unused")
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;
    private final FileService fileService;
    private final ProductVariantService productVariantService;
    private final EventPublisher eventPublisher;

    @Transactional
    public ResponseEntity<?> createProduct(
            List<ProductCreationRequest> productVariants,
            List<MultipartFile> images,
            List<AssetsMetaDetails> imageDetail) {

        Products product = productRepo.save(new Products());
        var variants = productVariantService.addProductVariants(
                productVariants,
                images,
                imageDetail,
                product
        );

        var variantInventory = productVariants.stream()
                .map(ProductCreationRequest::getInventory).toList();

        Map<String, Map<String, String>> variantInfo = new HashMap<>();

        for (int i = 0; i < variants.size(); i++) {
            var inventory = variantInventory.get(i);
            inventory.setVariantId(variants.get(i).getVariantId());

            var values = Stream.of(variantInventory.get(i).getAdditionalFields())
                    .flatMap(Collection::stream)
                    .collect(Collectors.toMap(KeyValuePair::getKey, KeyValuePair::getValue));
            variantInfo.put(variants.get(i).getVariantId(), values);

        }
        eventPublisher.publishEvent(new ProductCreatedEvent(variants, variantInfo,variantInventory));
        return ResponseEntity.ok(variants);
    }

    public ResponseEntity<Optional<Products>> getProducyById(String id) {
        return ResponseEntity.ok().body(productRepo.findById(id));

    }

    @Transactional
    public void deleteProductById(String id) {
        productRepo.deleteById(id);

    }

    @Transactional
    public void pathchProductDetails(String id, ProductBaseDetail productBaseDetail) {
        Optional<Products> optionalProduct = productRepo.findById(id);
        if (optionalProduct.isEmpty())
            throw new RuntimeException("Product not Found");
        Products product = optionalProduct.get();
        // product.setCategory(productBaseDetail.getCategory());
        // product.setAboutItem(productBaseDetail.getAboutItem());
        // product.setTitle(productBaseDetail.getTitle());
        // product.setDescription(productBaseDetail.getDescription());
        productRepo.save(product);
        return;
    }

    @Transactional
    public void patchProductMetaDetail(String id, Map<String, Object> metaDetails) {
        Optional<Products> optionalProduct = productRepo.findById(id);
        if (optionalProduct.isEmpty())
            throw new RuntimeException("Product not Found");
        Products product = optionalProduct.get();
        var assets = product.getMetaDetails().get("assets");
        metaDetails.put("assets", assets);
        product.setMetaDetails(metaDetails);
        productRepo.save(product);
    }

    public void patchProductAssets(String id,
            MultipartFile coverImage,
            List<MultipartFile> imageCollection,
            List<MultipartFile> carouselImages) {

        Optional<Products> optionalProduct = productRepo.findById(id);
        if (optionalProduct.isEmpty())
            throw new RuntimeException("Product not Found");
        Products product = optionalProduct.get();

        if (coverImage != null && !coverImage.isEmpty()) {
            String newCoverImageUrl = fileService.store(coverImage);
            // fileService.delete(product.getCoverImageURL());
            // product.setCoverImageURL(newCoverImageUrl);
        }

        if (imageCollection != null && !imageCollection.isEmpty()) {
            List<String> newImageCollections = fileService.storeAll(imageCollection);
            // fileService.deleteAll(product.getAssets().getImageCollections());
            // product.getAssets().setImageCollections(newImageCollections);

        }

        if (carouselImages != null && !carouselImages.isEmpty()) {
            List<String> newCarouselImages = fileService.storeAll(carouselImages);
            // fileService.deleteAll(product.getAssets().getCarouselImages());
            // product.getAssets().setCarouselImages(newCarouselImages);
        }

    }

}
