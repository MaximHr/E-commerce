package com.fmi.springcourse.server.dto.collection;

import java.util.UUID;

public class CollectionResponseWithCount extends CollectionResponse {
	private final long productsCount;
	
	public CollectionResponseWithCount(Long id, UUID slug, String imageUrl, String title,
	                                   long productsCount) {
		super(id, slug, imageUrl, title);
		this.productsCount = productsCount;
	}
	
	public long getProductsCount() {
		return productsCount;
	}
}
