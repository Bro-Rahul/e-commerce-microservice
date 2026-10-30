package com.e_commerce.search.services.variant;

import com.e_commerce.commons.events.products.ProductVariantAssetsUpdateEvent;
import com.e_commerce.commons.events.products.ProductVariantBaseDetailUpdateEvent;
import com.e_commerce.commons.events.products.ProductVariantMetaDetailsUpdatesEvent;
import com.e_commerce.commons.events.products.ProductVariantStatusUpdateEvent;
import com.e_commerce.search.exception.product.ProductNotFoundException;
import com.e_commerce.search.model.Products;
import com.e_commerce.search.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductVariantService {

    private final ProductRepo repo;

    public void consumeBaseDetailUpdateEvent(ProductVariantBaseDetailUpdateEvent event){
        Optional<Products> optionalProduct = repo.findByVariantId(event.getVariantId());
        if(optionalProduct.isEmpty())
            throw new ProductNotFoundException("Variant Does Not Exists","VARIANT_NOT_FOUND",null);

        Products product = optionalProduct.get();
        product.setTitle(event.getTitle());
        product.setDescription(event.getDescription());
        product.setAboutItem(event.getAbout());

        repo.save(product);
    }

    public void consumeMetaDetailUpdate(ProductVariantMetaDetailsUpdatesEvent event) {
        Optional<Products> optionalProduct = repo.findByVariantId(event.getVariantId());
        if(optionalProduct.isEmpty())
            throw new ProductNotFoundException("Variant Does Not Exists","VARIANT_NOT_FOUND",null);

        Products product = optionalProduct.get();
        product.setMetaDetails(event.getMetaDetails());
        repo.save(product);
    }

    public void consumeAssetUpdateEvent(ProductVariantAssetsUpdateEvent event) {
        Optional<Products> optionalProduct = repo.findByVariantId(event.getVariantId());
        if(optionalProduct.isEmpty())
            throw new ProductNotFoundException("Variant Does Not Exists","VARIANT_NOT_FOUND",null);

        Products product = optionalProduct.get();
        if(event.getCoverImage()!=null){
            product.setCoverImageURL(event.getCoverImage());
        }
        if(event.getCarouselImages()!=null && !event.getCarouselImages().isEmpty()){
            product.getAssets().setCarouselImages(event.getCarouselImages());
        }
        if(event.getImageCollections()!=null && !event.getImageCollections().isEmpty()){
            product.getAssets().setImageCollections(event.getImageCollections());
        }

        repo.save(product);
    }

    public void consumeStatusUpdateEvent(ProductVariantStatusUpdateEvent event) {
        Optional<Products> optionalProduct = repo.findByVariantId(event.getVariantId());
        if(optionalProduct.isEmpty())
            throw new ProductNotFoundException("Variant Does Not Exists","VARIANT_NOT_FOUND",null);

        Products product = optionalProduct.get();
        product.setProductStatus(event.getStatus());
        repo.save(product);
    }
}
