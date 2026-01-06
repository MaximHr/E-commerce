package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.entity.Product;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.repository.ProductRepository;
import com.fmi.springcourse.server.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public Product getProductBySlug(String slugString) {
		try {
			UUID slug = UUID.fromString(slugString);
			
			return repository
				.findBySlug(slug)
				.orElseThrow(
					() -> new EntityNotFoundException("Sorry, we couldn't find this product.")
				);
		} catch (IllegalArgumentException e) {
			throw new EntityNotFoundException("Sorry, we couldn't find this product.", e);
		}
	}
	
	@Override
	public Page<Product> listProducts(Integer pageNumber, Integer size) {
		if (pageNumber == null) {
			throw new IllegalArgumentException("page number must not be null.");
		}
		if (size == null) {
			throw new IllegalArgumentException("size must not be null.");
		}
		if (size <= 0) {
			throw new IllegalArgumentException("size must be greater than 0.");
		}
		if (pageNumber < 0) {
			throw new IllegalArgumentException("page number must be 0 or greater.");
		}
		
		Pageable pageable = PageRequest.of(pageNumber, size);
		return repository.findAll(pageable);
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
