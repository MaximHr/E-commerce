package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
	Product uploadProduct(Product product);
	
	Product getProductBySlug(String slug);
	
	Product updateProduct(Long id, Product product);
	
	void deleteProduct(Long id);
	
	Page<Product> listProducts(Pageable pageable);
}
