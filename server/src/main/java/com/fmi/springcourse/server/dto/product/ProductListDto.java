package com.fmi.springcourse.server.dto.product;

import com.fmi.springcourse.server.entity.Product;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductListDto(Long id,
                             String title,
                             BigDecimal price,
                             Integer quantity,
                             BigDecimal discount,
                             String titleImage,
                             UUID slug
) {
	public ProductListDto(Product p) {
		
		this(
			p.getId(),
			p.getTitle(),
			p.getPrice(),
			p.getQuantity(),
			p.getDiscount(),
			p.getTitleImage(),
			p.getSlug()
		);
	}
}
