package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.CollectionRequest;
import com.fmi.springcourse.server.dto.CollectionResponse;
import com.fmi.springcourse.server.dto.CollectionResponseWithCount;
import com.fmi.springcourse.server.dto.CollectionResponseWithProducts;

import java.util.List;
import java.util.UUID;

public interface CollectionService {
	List<CollectionResponseWithCount> getAllCollections();
	
	CollectionResponseWithProducts getCollectionWithProducts(UUID slug);
	
	CollectionResponseWithCount createCollection(CollectionRequest request);
	
	CollectionResponseWithProducts addProductToCollection(UUID collectionSlug, long productId);
	
	CollectionResponseWithProducts removeProductFromCollection(UUID collectionSlug, long id);
	
	List<CollectionResponse> getCollectionsByProductId(Long productId);
	
	void deleteCollection(Long id);
}
