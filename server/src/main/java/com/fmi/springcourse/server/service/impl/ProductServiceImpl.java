package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.entity.Product;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.repository.ProductRepository;
import com.fmi.springcourse.server.service.ProductService;

import static com.fmi.springcourse.server.util.HTMLSanitizerUtil.sanitizeProductDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
	private final ProductRepository repository;
	private static final int MAX_PAGE_SIZE = 500;
	private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("price", "createdAt");
	
	public ProductServiceImpl(ProductRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Product uploadProduct(Product product) {
		sanitizeProductDetails(product);
		
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
	public Page<Product> listProducts(Pageable pageable) {
		if (pageable.getPageSize() > MAX_PAGE_SIZE) {
			throw new IllegalArgumentException("Max page size is " + MAX_PAGE_SIZE);
		}
		Sort sort = Sort.unsorted();
		
		for (Sort.Order order : pageable.getSort()) {
			if (ALLOWED_SORT_FIELDS.contains(order.getProperty())) {
				sort = sort.and(Sort.by(order));
			}
		}
		
		Pageable safePageable = PageRequest.of(
			pageable.getPageNumber(),
			pageable.getPageSize(),
			sort
		);
		
		return repository.findAll(safePageable);
	}
	
	@Override
	public Product updateProduct(Long id, Product newProduct) {
		sanitizeProductDetails(newProduct);
		
		Product existingProduct = repository
			.findById(id)
			.orElseThrow(
				() -> new EntityNotFoundException("Could not update product because it was not found.")
			);
		
		existingProduct.setTitle(newProduct.getTitle());
		existingProduct.setDescription(newProduct.getDescription());
		existingProduct.setDiscount(newProduct.getDiscount());
		existingProduct.setImages(newProduct.getImages());
		existingProduct.setQuantity(newProduct.getQuantity());
		existingProduct.setPrice(newProduct.getPrice());
		
		return repository.save(existingProduct);
	}
	
	@Override
	public void deleteProduct(Long id) {
		if (id == null) {
			throw new EntityNotFoundException("Could not delete product because it was not found.");
		}
		
		repository.deleteById(id);
	}
}
