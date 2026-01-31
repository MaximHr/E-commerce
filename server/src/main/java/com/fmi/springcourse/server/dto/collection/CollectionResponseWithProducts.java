package com.fmi.springcourse.server.dto.collection;

import com.fmi.springcourse.server.dto.product.ProductListDto;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;

public class CollectionResponseWithProducts extends CollectionResponse {
	private final Set<ProductListDto> products;
	
	public CollectionResponseWithProducts(Long id, UUID slug, String imageUrl, String title,
	                                      Set<ProductListDto> products) {
		super(id, slug, imageUrl, title);
		this.products = products;
	}
	
	public Set<ProductListDto> getProducts() {
		return Collections.unmodifiableSet(products);
	}
}
