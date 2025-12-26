package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.entity.Product;

import java.util.UUID;

public interface ProductService {
	Product uploadProduct(Product product);
	
	Product getProductBySlug(UUID slug);
	
	Product updateProduct(Long id, Product product);
	
	void deleteProduct(Long id);
}
