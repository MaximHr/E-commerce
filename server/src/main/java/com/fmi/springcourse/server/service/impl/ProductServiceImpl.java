package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.entity.Product;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.repository.ProductRepository;
import com.fmi.springcourse.server.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
	private final ProductRepository repository;
	
	public ProductServiceImpl(ProductRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Product uploadProduct(Product product) {
		return repository.save(product);
	}
	
	@Override
	public Product getProductBySlug(UUID slug) {
		Product product = repository
			.findBySlug(slug)
			.orElseThrow(
				() -> new EntityNotFoundException("Sorry, we couldn't find this product.")
			);
		
		return product;
	}
	
	@Override
	public Product updateProduct(Long id, Product newProduct) {
		return repository
			.findById(id)
			.orElseThrow(() -> new EntityNotFoundException(
				"Could not update product because it was not found.")
			);
	}
	
	@Override
	public void deleteProduct(Long id) {
		if (id == null) {
			throw new EntityNotFoundException("Could not delete product because it was not found.");
		}
		
		repository.deleteById(id);
	}
}
