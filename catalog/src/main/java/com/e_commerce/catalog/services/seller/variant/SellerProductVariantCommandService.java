package com.e_commerce.catalog.services.seller.variant;

import com.e_commerce.catalog.dto.assets.AssetsMetaDetails;
import com.e_commerce.catalog.dto.assets.SavedAssetsDTO;
import com.e_commerce.catalog.dto.product.seller.ProductCreationRequest;
import com.e_commerce.catalog.exceptions.products.ProductNotFoundException;
import com.e_commerce.catalog.mapper.product.ProductVariantMapper;
import com.e_commerce.catalog.model.Category;
import com.e_commerce.catalog.model.ImageType;
import com.e_commerce.catalog.model.Products;
import com.e_commerce.catalog.model.ProductsVariants;
import com.e_commerce.catalog.rabbitmq.EventPublisher;
import com.e_commerce.catalog.repo.ProductVariantsRepo;
import com.e_commerce.catalog.services.file.ProductAssetService;
import com.e_commerce.commons.dto.inventory.ProductInventoryRequest;
import com.e_commerce.commons.dto.product.ProductBaseDetail;
import com.e_commerce.commons.dto.product.ProductMediaAssets;
import com.e_commerce.commons.dto.product.ProductStatus;
import com.e_commerce.commons.dto.product.Variant;
import com.e_commerce.commons.events.products.ProductCreatedEvent;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerProductVariantCommandService {

    private final ProductVariantMapper mapper;
    private final ProductAssetService assetService;
    private final ProductVariantsRepo repo;
    private final EventPublisher eventPublisher;

    public void createVariants(
            Products product,
            Category category,
            List<ProductCreationRequest> productVariants,
            List<MultipartFile> images,
            List<AssetsMetaDetails> imageDetail) {
        Map<Integer, List<AssetsMetaDetails>> variantsImages = imageDetail
                .stream()
                .collect(Collectors.groupingBy(AssetsMetaDetails::getVariantId));
        List<ProductsVariants> variants = new ArrayList<>();
        List<String> storedImages = new ArrayList<>();
        try {
            for (int i = 0; i < productVariants.size(); i++) {

                ProductCreationRequest request = productVariants.get(i);

                List<AssetsMetaDetails> variantImage = variantsImages.get(i + 1);

                SavedAssetsDTO assetsDTO = assetService.saveProductImages(i, variantImage, images);

                ProductsVariants variant = mapper.toEntity(request, product, category,
                        assetsDTO.getCoverImage());

                ProductMediaAssets assets = new ProductMediaAssets(
                        assetsDTO.getCarouselImages(),
                        assetsDTO.getImageCollections()
                );
                variant.setAssets(assets);
                variants.add(variant);

                storedImages.addAll(assetsDTO.getCarouselImages());
                storedImages.add(assetsDTO.getCoverImage());
                storedImages.addAll(assetsDTO.getImageCollections());
            }
            List<ProductsVariants> updatedVariants = repo.saveAll(variants);

            List<ProductInventoryRequest> inventoryRequests = productVariants.stream()
                    .map(ProductCreationRequest::getInventory).toList();

            ProductCreatedEvent event = getEvent(updatedVariants, inventoryRequests);
            eventPublisher.publishEvent(event);

        } catch (Exception e) {
            assetService.deleteImages(storedImages);
            throw e;
        }
    }

    private ProductCreatedEvent getEvent(List<ProductsVariants> variants,
            List<ProductInventoryRequest> inventoryRequests) {
        for (int i = 0; i < variants.size(); i++) {
            String variantId = variants.get(i).getVariantId();
            inventoryRequests.get(i).setVariantId(variantId);
        }
        List<Variant> products = variants.stream().map(mapper::toDTO).toList();
        return new ProductCreatedEvent(products, inventoryRequests);
    }


    @Transactional
    public void updateVariantBaseDetail(String variantId, ProductBaseDetail productBaseDetail) {
        Optional<ProductsVariants> optionalVariant = repo.findById(variantId);
        if(optionalVariant.isEmpty())
            throw new ProductNotFoundException("No Such Product Variant Exists ","PRODUCT_VARIANT_NOT_FOUND","/seller/product-variant/{id}");
        ProductsVariants variant = optionalVariant.get();
        variant.setTitle(productBaseDetail.getTitle());
        variant.setDescription(productBaseDetail.getDescription());
        variant.setAbout(productBaseDetail.getAbout());
        repo.save(variant);
        // publish an update event for search service to updates its own copy
    }


    @Transactional
    public void updateVariantMetaDetail(String variantId, @Valid Map<String, Object> productMetaDetails) {
        Optional<ProductsVariants> optionalVariant = repo.findById(variantId);
        if(optionalVariant.isEmpty())
            throw new ProductNotFoundException("No Such Product Variant Exists ","PRODUCT_VARIANT_NOT_FOUND","/seller/product-variant/{id}");
        ProductsVariants variant = optionalVariant.get();
        variant.setMetaDetails(productMetaDetails);
        repo.save(variant);
        // publish an update event for search service to updates its own copy
    }

    @Transactional
    public void deleteProductVariant(String variantId) {
        repo.deleteById(variantId);
        // publish an update event for search service to updates its own copy
    }

    @Transactional
    public void updateVariantStatus(String variantId, ProductStatus status) {
        Optional<ProductsVariants> optionalVariant = repo.findById(variantId);
        if(optionalVariant.isEmpty())
            throw new ProductNotFoundException("No Such Product Variant Exists ","PRODUCT_VARIANT_NOT_FOUND","/seller/product-variant/{id}");
        ProductsVariants variant = optionalVariant.get();
        variant.setProductStatus(status);
        repo.save(variant);
        // publish an update event for search service to updates its own copy
    }

    @Transactional
    public void updateVariantAssets(
            String variantId,
            List<MultipartFile> images,
            List<AssetsMetaDetails> metaDetails
    ) {
        Optional<ProductsVariants> optionalVariant = repo.findById(variantId);
        if(optionalVariant.isEmpty())
            throw new ProductNotFoundException("No Such Product Variant Exists ","PRODUCT_VARIANT_NOT_FOUND","/seller/product-variant/{id}");
        ProductsVariants variant = optionalVariant.get();

        var imagesIndex = metaDetails.stream().collect(Collectors.groupingBy(AssetsMetaDetails::getType));
        if(!imagesIndex.get(ImageType.CoverImage).isEmpty()){
            int coverIndex = imagesIndex.get(ImageType.CoverImage).getFirst().getIndex();
            String newCoverImage = assetService.storeCoverImage(variant.getCoverImageURL(),images.get(coverIndex));
            variant.setCoverImageURL(newCoverImage);
        }

        if(!imagesIndex.get(ImageType.CarouselImages).isEmpty()){
            List<MultipartFile> newImages = imagesIndex
                    .get(ImageType.CarouselImages)
                    .stream()
                    .map(item->images.get(item.getIndex()))
                    .toList();

            List<String> newImagesURLS = assetService.storeOtherImages(variant.getAssets().getCarouselImages(),newImages);
            variant.getAssets().setCarouselImages(newImagesURLS);
        }

        if(!imagesIndex.get(ImageType.CollectionImages).isEmpty()){
            List<MultipartFile> newImages = imagesIndex
                    .get(ImageType.CollectionImages)
                    .stream()
                    .map(item->images.get(item.getIndex()))
                    .toList();

            List<String> newImagesURLS = assetService.storeOtherImages(variant.getAssets().getCarouselImages(),newImages);
            variant.getAssets().setImageCollections(newImagesURLS);
        }

        repo.save(variant);
        // publish an update event for search service to updates its own copy
    }
}
