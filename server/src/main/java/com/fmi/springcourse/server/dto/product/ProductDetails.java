package com.fmi.springcourse.server.dto.product;

import com.fmi.springcourse.server.entity.Product;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ProductDetails(Long id,
                             String title,
                             String description,
                             BigDecimal price,
                             Integer quantity,
                             BigDecimal discount,
                             List<String> images,
                             UUID slug,
                             Instant createdAt
) {
	public ProductDetails(Product p) {
		this(
			p.getId(),
			p.getTitle(),
			p.getDescription(),
			p.getPrice(),
			p.getQuantity(),
			p.getDiscount(),
			p.getImages(),
			p.getSlug(),
			p.getCreatedAt()
		);
	}
}
