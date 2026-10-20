package com.e_commerce.search.services.search;

import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.e_commerce.search.dto.product.SellerProduct;
import com.e_commerce.search.dto.search.PaginatedResponse;
import com.e_commerce.search.dto.search.SearchFilter;
import com.e_commerce.search.model.Products;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerSearch {


    private final ElasticsearchOperations elasticsearchOperations;

    private PaginatedResponse<SellerProduct> getSellerProducts(NativeQuery query) {
        SearchHits<Products> hits =
                elasticsearchOperations.search(
                        query,
                        Products.class
                );

        var content = hits.getSearchHits().stream()
                .map(hit -> {
                    Products product = hit.getContent();

                    SellerProduct dto =
                            new SellerProduct();

                    dto.setId(product.getId());
                    dto.setProductId(product.getProductId());
                    dto.setVariantId(product.getVariantId());
                    dto.setTitle(product.getTitle());
                    dto.setCategory(product.getCategory());
                    dto.setDescription(product.getDescription());
                    dto.setProductStatus(product.getProductStatus());
                    dto.setCoverImage(product.getCoverImageURL());

                    if (product.getInventory() != null) {
                        var inventory =
                                new SellerProduct.InventoryProjection();

                        inventory.setPrice(product.getInventory().getPrice());
                        inventory.setSku(product.getInventory().getSku());
                        inventory.setQuantity(
                                product.getInventory().getQuantity()
                        );

                        dto.setInventory(inventory);
                    }

                    return dto;
                })
                .toList();

        PaginatedResponse<SellerProduct> pageResponse = getPageResponse(query, content, hits);
        return pageResponse;
    }

    private static @NonNull PaginatedResponse<SellerProduct> getPageResponse(NativeQuery query, List<SellerProduct> content, SearchHits<Products> hits) {
        Page<SellerProduct> response = new PageImpl<>(
                content,
                query.getPageable(),
                hits.getTotalHits()
        );
        PaginatedResponse<SellerProduct> pageResponse = new PaginatedResponse<>();
        pageResponse.setContent(response.getContent());
        pageResponse.setCurrentPage(response.getNumber());
        pageResponse.setFirst(response.isFirst());
        pageResponse.setLast(response.isLast());
        pageResponse.setTotalPages(response.getTotalPages());
        pageResponse.setPageSize(response.getSize());
        return pageResponse;
    }

    public PaginatedResponse<SellerProduct> getProducts(SearchFilter filter, Pageable pageable) {
        Query finalQuery = Query.of(q -> q.bool(b -> {

            // 1. Category filter
            if (filter.getCategory() != null
                    && !filter.getCategory().isBlank()) {

                b.filter(f -> f.term(t -> t
                        .field("category")
                        .value(filter.getCategory())
                ));
            }

            // 2. Product status filter
            if (filter.getStatus() != null) {

                b.filter(f -> f.term(t -> t
                        .field("productStatus.keyword")
                        .value(filter.getStatus().toString())
                ));
            }

            // 3. Last modified / date filter
            if (filter.getLastModified() != null) {

                b.filter(f -> f.range(r -> r
                        .date(d -> d
                                .field("createdAt")
                                .gte(filter.getLastModified())
                                .lte("now")
                        )
                ));
            }

            // 4. Product search: title OR SKU

            if (filter.getProductSearch() != null
                    && !filter.getProductSearch().isBlank()) {

                String searchText = filter.getProductSearch().trim();

                b.should(m -> m.bool(search -> search
                        .should(s -> s.matchBoolPrefix(t -> t
                                .field("title")
                                .query(searchText)
                                .boost(10.0f)
                        ))
                        .should(s -> s.matchBoolPrefix(t -> t
                                .field("inventory.sku")
                                .query(searchText)
                                .boost(15.0f)
                        ))

                        .minimumShouldMatch("1")
                ));
            }

            return b;
        }));

        NativeQuery query = NativeQuery.builder()
                .withQuery(finalQuery)
                .withPageable(pageable)
                .build();

        return getSellerProducts(query);
    }
}
