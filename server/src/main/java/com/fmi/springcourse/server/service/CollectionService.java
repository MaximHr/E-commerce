package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.collection.CollectionRequest;
import com.fmi.springcourse.server.dto.collection.CollectionResponse;
import com.fmi.springcourse.server.dto.collection.CollectionResponseWithCount;
import com.fmi.springcourse.server.dto.collection.CollectionResponseWithProducts;

import java.util.List;
import java.util.UUID;

public interface CollectionService {
	List<CollectionResponseWithCount> getAllCollections();
	
	CollectionResponseWithProducts getCollectionWithProducts(UUID slug);
	
	CollectionResponseWithCount createCollection(CollectionRequest request);
	
	CollectionResponseWithProducts addProductToCollection(UUID collectionSlug, long productId);
	
	CollectionResponseWithProducts removeProductFromCollection(UUID collectionSlug, long id);
	
	List<CollectionResponse> getCollectionsByProductId(Long productId);
	
	CollectionResponse updateCollection(CollectionRequest request, long id);
	
	void deleteCollection(Long id);
}
