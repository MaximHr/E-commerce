package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.dto.collection.CollectionRequest;
import com.fmi.springcourse.server.dto.collection.CollectionResponse;
import com.fmi.springcourse.server.dto.collection.CollectionResponseWithCount;
import com.fmi.springcourse.server.dto.collection.CollectionResponseWithProducts;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.exception.InvalidEntityDataException;
import com.fmi.springcourse.server.exception.util.CustomExceptionHandler;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.service.CollectionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/collections")
public class CollectionController {
	private final CollectionService service;
	
	public CollectionController(CollectionService service) {
		this.service = service;
	}
	
	@GetMapping
	public ResponseEntity<List<CollectionResponseWithCount>> getAllCollections() {
		return ResponseEntity.ok(service.getAllCollections());
	}
	
	@GetMapping("/{slug}")
	public ResponseEntity<CollectionResponseWithProducts> getCollectionWithProducts(@PathVariable UUID slug) {
		return ResponseEntity.ok(service.getCollectionWithProducts(slug));
	}
	
	@PostMapping
	public ResponseEntity<CollectionResponseWithCount> createCollection(
		@Valid @RequestBody CollectionRequest request, Errors errors) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(service.createCollection(request));
	}
	
	@PostMapping("/{slug}/products/{productId}")
	public ResponseEntity<CollectionResponseWithProducts> addProductToCollection(
		@PathVariable UUID slug,
		@PathVariable Long productId) {
		return ResponseEntity.ok(service.addProductToCollection(slug, productId));
	}
	
	@DeleteMapping("/{slug}/products/{productId}")
	public ResponseEntity<CollectionResponseWithProducts> removeProductFromCollection(
		@PathVariable UUID slug,
		@PathVariable Long productId) {
		return ResponseEntity.ok(service.removeProductFromCollection(slug, productId));
	}
	
	@GetMapping("/by-product/{productId}")
	public ResponseEntity<List<CollectionResponse>> getCollectionsByProductId(
		@PathVariable Long productId) {
		return ResponseEntity.ok(service.getCollectionsByProductId(productId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CollectionResponse> updateCollection(
		@Valid @RequestBody CollectionRequest collection,
		@PathVariable Long id,
		Errors errors
	) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		
		return ResponseEntity.ok(service.updateCollection(collection, id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCollection(@PathVariable Long id) {
		service.deleteCollection(id);
		
		return ResponseEntity.ok("Collection deleted successfully");
	}
	
	@ExceptionHandler(InvalidEntityDataException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ExceptionResponse invalidEntityHandler(InvalidEntityDataException e) {
		return new ExceptionResponse(HttpStatus.BAD_REQUEST, e.getMessages());
	}
	
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<String> entityNotFoundHandler(EntityNotFoundException e) {
		return ResponseEntity
			.status(HttpStatus.NOT_FOUND)
			.body(e.getMessage());
	}
}
