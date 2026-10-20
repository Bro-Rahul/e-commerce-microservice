package com.e_commerce.search.dto.search;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PaginatedResponse<T> {
    private List<T> content;

    @JsonProperty("isFirst")
    private boolean isFirst;

    @JsonProperty("isLast")
    private boolean isLast;

    private int totalPages;

    private int currentPage;

    private int pageSize;
}
