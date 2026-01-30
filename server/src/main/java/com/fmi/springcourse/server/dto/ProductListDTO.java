package com.fmi.springcourse.server.dto;

import com.fmi.springcourse.server.entity.Product;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductListDTO(Long id,
                             String title,
                             BigDecimal price,
                             Integer quantity,
                             BigDecimal discount,
                             String image,
                             UUID slug
) {
	public ProductListDTO(Product p) {
		
		this(
			p.getId(),
			p.getTitle(),
			p.getPrice(),
			p.getQuantity(),
			p.getDiscount(),
			p.getImages().getFirst(),
			p.getSlug()
		);
	}
}
