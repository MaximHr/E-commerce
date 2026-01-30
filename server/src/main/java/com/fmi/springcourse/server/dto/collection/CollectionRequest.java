package com.fmi.springcourse.server.dto.collection;

import com.fmi.springcourse.server.entity.Product;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Collections;
import java.util.Set;

public class CollectionRequest {
	private static final int MAX_TITLE_LENGTH = 100;
	
	@NotNull(message = "Image can not be null")
	private final String imageUrl;
	
	@Size(
		max = MAX_TITLE_LENGTH,
		message = "Title must be no more than {max} characters long"
	)
	private final String title;
	
	private final Set<Product> products;
	
	public CollectionRequest(String imageUrl, String title, Set<Product> products) {
		this.imageUrl = imageUrl;
		this.title = title;
		this.products = products;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public String getTitle() {
		return title;
	}
	
	public Set<Product> getProducts() {
		return Collections.unmodifiableSet(products);
	}
}
