package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.entity.Product;
import org.springframework.data.domain.Page;

public interface ProductService {
	Product uploadProduct(Product product);
	
	Product getProductBySlug(String slug);
	
	Product updateProduct(Long id, Product product);
	
	void deleteProduct(Long id);
	
	Page<Product> listProducts(Integer size, Integer limit);
}
