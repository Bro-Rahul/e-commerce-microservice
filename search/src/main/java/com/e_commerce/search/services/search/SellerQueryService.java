package com.e_commerce.search.services.search;

import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.ChildScoreMode;
import com.e_commerce.search.dto.product.SellerProduct;
import com.e_commerce.search.dto.search.PaginatedResponse;
import com.e_commerce.search.mapper.ProductsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.FetchSourceFilter;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class SellerQueryService {

    private final ElasticsearchOperations operations;
    private final ProductsMapper mapper;

    public ResponseEntity<PaginatedResponse<SellerProduct>> searchResults(
            String category,
            String searchText,
            String status,
            String createdAt,
            Pageable pageable
    ) {

        NativeQuery query = NativeQuery.builder()
                .withQuery(q->
                        q.bool(b -> {

                    // 1. Category filter
                    if (category!= null
                            && !category.isBlank()) {

                        b.filter(f -> f.terms(t -> t
                                .field("productCategories")
                                .terms(tq->tq.value(List.of(FieldValue.of(category))))
                        ));
                    }

                    // 2. Product status filter
                    if (status != null) {

                        b.filter(f -> f.term(t -> t
                                .field("productStatus")
                                .value(status)
                        ));
                    }

                    // 4. Product search: title OR SKU

                    if (searchText != null
                            && !searchText.isBlank()) {

                        b.should(m -> m.bool(search -> search
                                .should(s -> s.matchBoolPrefix(t -> t
                                        .field("title")
                                        .query(searchText)
                                        .boost(15.0f)
                                ))
                                .should(s ->s.nested(n -> n
                                        .path("inventory")
                                        .query(nq -> nq
                                                .matchBoolPrefix(mb -> mb
                                                        .field("inventory.sku")
                                                        .query(searchText)
                                                        .boost(2.0f)
                                                )
                                        )
                                        .scoreMode(ChildScoreMode.Max)
                                ))
                                .minimumShouldMatch("1")
                        ));
                        b.minimumShouldMatch("1");
                    }

                    if(createdAt!=null){
                        b.filter(f->
                            f.range(r->
                                r.date(d->
                                    d
                                    .field("createdAt")
                                    .lte("now")
                                    .gte(createdAt)
                                )
                            )
                        );
                    }
                    return b;
                }))
                .withPageable(pageable)
                .withSourceFilter(
                        new FetchSourceFilter(
                                true,
                                new String[]{
                                        "id",
                                        "productId",
                                        "variantId",
                                        "title",
                                        "description",
                                        "productCategories",
                                        "coverImageUrl",
                                        "productStatus",
                                        "inventory.sku",
                                        "inventory.price",
                                        "inventory.quantity"
                                },
                                null
                        )
                )
                .build();

        SearchHits<SellerProduct> hits =
                operations.search(
                        query,
                        SellerProduct.class,
                        IndexCoordinates.of("products")
                );

        List<SellerProduct> content = hits.getSearchHits()
                .stream()
                .map(SearchHit::getContent)
                .toList();

        Page<SellerProduct> result = new PageImpl<>(
                content,
                pageable,
                hits.getTotalHits()
        );

        return ResponseEntity.ok(mapper.toPaginatedSellerProduct(result));
    }
}
