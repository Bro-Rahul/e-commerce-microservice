package com.e_commerce.catalog.services.seller;

import com.e_commerce.catalog.dto.events.product.ProductCreatedEvent;
import com.e_commerce.catalog.dto.product.ProductBaseDetail;
import com.e_commerce.catalog.dto.product.ProductInventoryRequest;
import com.e_commerce.catalog.model.ProductMediaAssets;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.rabbitmq.EventPublisher;
import com.e_commerce.catalog.repo.ProductRepo;
import com.e_commerce.catalog.services.file.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;
    private final FileService fileService;
    private final EventPublisher eventPublisher;

    @Transactional
    public Products createProduct(
            Map<String, Object> metaDetails,
            ProductBaseDetail productBaseDetail,
            List<ProductInventoryRequest> inventoryRequest,
            MultipartFile coverImage,
            List<MultipartFile> imageCollection,
            List<MultipartFile> carouselImages) {
        List<String> uploadedFiles = new ArrayList<>();
        try {
            String coverImageUrl = fileService.store(coverImage);
            uploadedFiles.add(coverImageUrl);
            List<String> imageCollectionUrls = fileService.storeAll(imageCollection);
            uploadedFiles.addAll(imageCollectionUrls);
            List<String> carouselImageUrls = fileService.storeAll(carouselImages);
            uploadedFiles.addAll(carouselImageUrls);

            ProductMediaAssets productMediaAssets = new ProductMediaAssets(carouselImageUrls,
                    imageCollectionUrls);

            Products product = new Products();
            product.setTitle(productBaseDetail.getTitle());
            product.setCategory(productBaseDetail.getCategory());
            product.setDescription(productBaseDetail.getDescription());
            product.setAboutItem(productBaseDetail.getAboutItem());
            product.setCoverImageURL(coverImageUrl);
            product.setAssets(productMediaAssets);
            product.setMetaDetails(metaDetails);

            Products updatedProduct = productRepo.save(product);
            eventPublisher.publishEvent(
                    new ProductCreatedEvent(updatedProduct,
                            inventoryRequest));

            return updatedProduct;
        } catch (RuntimeException exception) {
            fileService.deleteAll(uploadedFiles);
            throw exception;
        }
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
        product.setCategory(productBaseDetail.getCategory());
        product.setAboutItem(productBaseDetail.getAboutItem());
        product.setTitle(productBaseDetail.getTitle());
        product.setDescription(productBaseDetail.getDescription());
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
            fileService.delete(product.getCoverImageURL());
            product.setCoverImageURL(newCoverImageUrl);
        }

        if (imageCollection != null && !imageCollection.isEmpty()) {
            List<String> newImageCollections = fileService.storeAll(imageCollection);
            fileService.deleteAll(product.getAssets().getImageCollections());
            product.getAssets().setImageCollections(newImageCollections);

        }

        if (carouselImages != null && !carouselImages.isEmpty()) {
            List<String> newCarouselImages = fileService.storeAll(carouselImages);
            fileService.deleteAll(product.getAssets().getCarouselImages());
            product.getAssets().setCarouselImages(newCarouselImages);
        }

    }
}
