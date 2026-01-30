package com.fmi.springcourse.server.dto.product;

import com.fmi.springcourse.server.entity.Product;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public record ProductDetailsWithCollectionIds(Long id,
                                              String title,
                                              String description,
                                              BigDecimal price,
                                              Integer quantity,
                                              BigDecimal discount,
                                              List<String> images,
                                              UUID slug,
                                              Instant createdAt,
                                              Set<Long> collectionsIds) {
	public ProductDetailsWithCollectionIds(Product p, Set<Long> collectionsIds) {
		this(
			p.getId(),
			p.getTitle(),
			p.getDescription(),
			p.getPrice(),
			p.getQuantity(),
			p.getDiscount(),
			p.getImages(),
			p.getSlug(),
			p.getCreatedAt(),
			collectionsIds
		);
	}
}
