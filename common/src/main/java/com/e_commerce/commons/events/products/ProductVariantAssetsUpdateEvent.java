package com.e_commerce.commons.events.products;

import com.e_commerce.commons.constants.RabbitMQConstants;
import com.e_commerce.commons.events.Event;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductVariantAssetsUpdateEvent implements Event {
    private String eventId;

    private LocalDateTime createdAt;

    private String variantId;
    private String coverImage;
    private List<String> imageCollections;
    private List<String> carouselImages;

    public ProductVariantAssetsUpdateEvent(
            String variantId,
            String coverImage,
            List<String> carouselImages,
            List<String>imageCollections
    ){
        this.eventId = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.variantId = variantId;
        this.coverImage = coverImage;
        this.carouselImages = carouselImages;
        this.imageCollections = imageCollections;
    }


    @Override
    public String getRoutingKey() {
        return "catalog.product.assets_updated";
    }

    @Override
    public String getExchangeName() {
        return RabbitMQConstants.CATALOG_EXCHANGE;
    }
}
