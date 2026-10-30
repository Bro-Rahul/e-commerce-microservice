package com.e_commerce.search.rabbitmq.eventDispatcher;

import com.e_commerce.commons.events.products.*;
import com.e_commerce.search.services.variant.ProductVariantService;
import org.springframework.amqp.core.Message;
import org.springframework.stereotype.Component;
import com.e_commerce.search.services.product.ProductService;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class ProductEventDispatcher {

    private final ProductService productService;
    private final ProductVariantService variantService;
    private final ObjectMapper objectMapper;

    public void dispatchEvent(Message message,String routingKey) {
        switch (routingKey) {
            case "catalog.product.created":
                processProductCreatedEvent(message);
                break;
            case "catalog.product.base_detail_updated":
                processProductBaseDetailUpdateEvent(message);
                break;
            case "catalog.product.meta_detail_updated":
                processProductMetaDetailUpdateEvent(message);
                break;
            case "catalog.product.assets_updated":
                processProductAssetsUpdateEvent(message);
                break;
            case "catalog.product.status_update":
                processVariantStatusUpdateEvent(message);
                break;
            default:
                break;
        }
    }

    public void processProductCreatedEvent(Message message) {
        try{
            ProductCreatedEvent consumer = objectMapper.readValue(message.getBody(), ProductCreatedEvent.class);
            productService.createProductDocument(consumer);
        }catch (Exception e){
            long retry = message.getMessageProperties().getRetryCount();
            if(retry == 3){
                // publish fail event for product created
                System.out.println("All retry completed putting message into dlq ");
            }
            message.getMessageProperties().incrementRetryCount();
            throw e;
        }
    }

    public void processProductBaseDetailUpdateEvent(Message message){
        try{
            ProductVariantBaseDetailUpdateEvent event = objectMapper.readValue(
                    message.getBody(),
                    ProductVariantBaseDetailUpdateEvent.class
            );
            variantService.consumeBaseDetailUpdateEvent(event);
        }catch (Exception e){
            long retry = message.getMessageProperties().getRetryCount();
            if(retry == 3){
                // publish fail event for product created
                System.out.println("All retry completed putting message into dlq ");
            }
            message.getMessageProperties().incrementRetryCount();
            throw e;
        }
    }

    public void processProductMetaDetailUpdateEvent(Message message){
        try{
            ProductVariantMetaDetailsUpdatesEvent event = objectMapper.readValue(
                    message.getBody(),
                    ProductVariantMetaDetailsUpdatesEvent.class
            );
            variantService.consumeMetaDetailUpdate(event);
        }catch (Exception e){
            long retry = message.getMessageProperties().getRetryCount();
            if(retry == 3){
                // publish fail event for product created
                System.out.println("All retry completed putting message into dlq ");
            }
            message.getMessageProperties().incrementRetryCount();
            throw e;
        }
    }

    public void processProductAssetsUpdateEvent(Message message){
        try{
            ProductVariantAssetsUpdateEvent event = objectMapper.readValue(
                    message.getBody(),
                    ProductVariantAssetsUpdateEvent.class
            );
            variantService.consumeAssetUpdateEvent(event);
        }catch (Exception e){
            long retry = message.getMessageProperties().getRetryCount();
            if(retry == 3){
                // publish fail event for product created
                System.out.println("All retry completed putting message into dlq ");
            }
            message.getMessageProperties().incrementRetryCount();
            throw e;
        }
    }

    public void processVariantStatusUpdateEvent(Message message){
        try{
            ProductVariantStatusUpdateEvent event = objectMapper.readValue(
                    message.getBody(),
                    ProductVariantStatusUpdateEvent.class
            );
            variantService.consumeStatusUpdateEvent(event);
        }catch (Exception e){
            long retry = message.getMessageProperties().getRetryCount();
            if(retry == 3){
                // publish fail event for product created
                System.out.println("All retry completed putting message into dlq ");
            }
            message.getMessageProperties().incrementRetryCount();
            throw e;
        }
    }
}