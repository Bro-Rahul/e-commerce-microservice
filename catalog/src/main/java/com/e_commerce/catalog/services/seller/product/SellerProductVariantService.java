package com.e_commerce.catalog.services.seller.product;

import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.dto.assets.SavedAssetsDTO;
import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.dto.product.seller.SellerProductList;
import com.e_commerce.catalog.mapper.product.ProductVariantMapper;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.catalog.rabbitmq.EventPublisher;
import com.e_commerce.catalog.repo.ProductVariantsRepo;
import com.e_commerce.catalog.services.file.ProductAssetService;
import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.ProductMediaAssets;
import com.e_commerce.commons.dto.product.Variant;
import com.e_commerce.commons.dto.util.KeyValuePair;
import com.e_commerce.commons.events.products.ProductCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerProductVariantService {

    private final ProductVariantMapper mapper;
    private final ProductAssetService assetService;
    private final ProductVariantsRepo repo;
    private final EventPublisher eventPublisher;

    public void createVariants(
            Products product,
            List<ProductCreationRequest> productVariants,
            List<MultipartFile> images,
            List<AssetsMetaDetails> imageDetail
    ) {
        Map<Integer,List<AssetsMetaDetails>> variantsImages = imageDetail
                .stream()
                .collect(Collectors.groupingBy(AssetsMetaDetails::getVariantId));
        List<ProductsVariants> variants = new ArrayList<>();
        List<String> storedImages = new ArrayList<>();
       try {
           for (int i = 0; i < productVariants.size(); i++) {

               ProductCreationRequest request = productVariants.get(i);
               List<AssetsMetaDetails> variantImage = variantsImages.get(i+1);
               SavedAssetsDTO assetsDTO = assetService.saveProductImages(i,variantImage,images);
               ProductsVariants variant = mapper.toEntity(request,product.getProductId(),assetsDTO.getCoverImage());
               ProductMediaAssets assets = new ProductMediaAssets(assetsDTO.getCarouselImages(),assetsDTO.getImageCollections());
               variant.setAssets(assets);
               variants.add(variant);

               storedImages.addAll(assetsDTO.getCarouselImages());
               storedImages.addAll(assetsDTO.getImageCollections());
           }
           List<ProductsVariants> updatedVariants = repo.saveAll(variants);
           List<ProductInventoryRequest> inventoryRequests = productVariants.stream().map(ProductCreationRequest::getInventory).toList();
           ProductCreatedEvent event = getEvent(updatedVariants,inventoryRequests);
           eventPublisher.publishEvent(event);

       }catch (Exception e){
           assetService.deleteImages(storedImages);
           throw e;
       }
    }

    private ProductCreatedEvent getEvent(List<ProductsVariants> variants,List<ProductInventoryRequest> inventoryRequests){
        for (int i = 0; i < variants.size(); i++) {
            String variantId = variants.get(i).getVariantId();
            inventoryRequests.get(i).setVariantId(variantId);
        }
        List<Variant> products = variants.stream().map(mapper::toDTO).toList();
        return new ProductCreatedEvent(products,inventoryRequests);
    }

    public ResponseEntity<List<SellerProductList>> getAllVariants() {
        return ResponseEntity.ok(repo.findAllBy());
    }
}
