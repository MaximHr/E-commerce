package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.collection.CollectionRequest;
import com.fmi.springcourse.server.dto.collection.CollectionResponse;
import com.fmi.springcourse.server.dto.collection.CollectionResponseWithCount;
import com.fmi.springcourse.server.dto.collection.CollectionResponseWithProducts;
import com.fmi.springcourse.server.dto.product.ProductListDTO;
import com.fmi.springcourse.server.entity.Collection;
import com.fmi.springcourse.server.entity.Product;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.repository.CollectionRepository;
import com.fmi.springcourse.server.repository.ProductRepository;
import com.fmi.springcourse.server.service.CollectionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class CollectionServiceImpl implements CollectionService {
	private final CollectionRepository collectionRepository;
	private final ProductRepository productRepository;
	
	public CollectionServiceImpl(CollectionRepository collectionRepository,
	                             ProductRepository productRepository) {
		this.collectionRepository = collectionRepository;
		this.productRepository = productRepository;
	}
	
	@Transactional(readOnly = true)
	public List<CollectionResponseWithCount> getAllCollections() {
		return collectionRepository
			.findAllWithProductCount()
			.stream()
			.map(
				collection -> toResponse(collection, collection.getProductsCount())
			)
			.toList();
	}
	
	@Transactional(readOnly = true)
	public CollectionResponseWithProducts getCollectionWithProducts(UUID slug) {
		Collection collection = collectionRepository.findBySlugWithProducts(slug)
			.orElseThrow(() -> new EntityNotFoundException("Collection not found with slug: " + slug));
		
		return toResponseWithProducts(collection);
	}
	
	public CollectionResponseWithCount createCollection(CollectionRequest request) {
		Collection saved = collectionRepository.save(
			new Collection(request.getImageUrl(), request.getTitle())
		);
		
		return toResponse(saved, 0);
	}
	
	@Transactional(readOnly = true)
	public List<CollectionResponse> getCollectionsByProductId(Long productId) {
		productRepository.findById(productId)
			.orElseThrow(() -> new EntityNotFoundException("Product not found"));
		
		return collectionRepository.findByProductId(productId)
			.stream()
			.map(dto -> new CollectionResponse(
				dto.getId(),
				dto.getSlug(),
				dto.getImageUrl(),
				dto.getTitle()
			))
			.toList();
	}
	
	@Override
	public CollectionResponse updateCollection(CollectionRequest request, long id) {
		Collection collection = collectionRepository.findById(id)
			.orElseThrow(
				() -> new EntityNotFoundException("Sorry, we could not find the specified collection.")
			);
		collection.setImageUrl(request.getImageUrl());
		collection.setTitle(request.getTitle());
		
		return new CollectionResponse(collectionRepository.save(collection));
	}
	
	@Override
	public void deleteCollection(Long id) {
		collectionRepository.deleteCollectionAssociations(id);
		collectionRepository.deleteById(id);
	}
	
	public CollectionResponseWithProducts addProductToCollection(UUID collectionSlug, long productId) {
		Collection collection = collectionRepository.findBySlugWithProducts(collectionSlug)
			.orElseThrow(() -> new EntityNotFoundException("Collection not found"));
		
		Product product = productRepository.findById(productId)
			.orElseThrow(() -> new EntityNotFoundException("Product not found"));
		
		collection.getProducts().add(product);
		product.getCollections().add(collection);
		
		Collection updated = collectionRepository.save(collection);
		return toResponseWithProducts(updated);
	}
	
	public CollectionResponseWithProducts removeProductFromCollection(UUID collectionSlug, long id) {
		Collection collection = collectionRepository.findBySlugWithProducts(collectionSlug)
			.orElseThrow(() -> new EntityNotFoundException("Collection not found with slug"));
		
		Product product = productRepository.findById(id)
			.orElseThrow(() -> new EntityNotFoundException("Product not found with slug"));
		
		collection.getProducts().remove(product);
		product.getCollections().remove(collection);
		
		return toResponseWithProducts(
			collectionRepository.save(collection)
		);
	}
	
	private CollectionResponseWithCount toResponse(CollectionResponse collection, long count) {
		return new CollectionResponseWithCount(
			collection.getId(),
			collection.getSlug(),
			collection.getImageUrl(),
			collection.getTitle(),
			count
		);
	}
	
	private CollectionResponseWithCount toResponse(Collection collection, long count) {
		return new CollectionResponseWithCount(
			collection.getId(),
			collection.getSlug(),
			collection.getImageUrl(),
			collection.getTitle(),
			count
		);
	}
	
	private CollectionResponseWithProducts toResponseWithProducts(Collection collection) {
		Set<ProductListDTO> products = collection.getProducts().stream()
			.map(ProductListDTO::new)
			.collect(Collectors.toSet());
		
		return new CollectionResponseWithProducts(
			collection.getId(),
			collection.getSlug(),
			collection.getImageUrl(),
			collection.getTitle(),
			products
		);
	}
}
