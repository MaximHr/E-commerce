package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.entity.Product;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.exception.util.CustomExceptionHandler;
import com.fmi.springcourse.server.exception.InvalidEntityDataException;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController()
@RequestMapping("products")
public class ProductController {
	private final ProductService service;
	
	public ProductController(ProductService service) {
		this.service = service;
	}
	
	@PostMapping("/upload")
	public ResponseEntity<Product> uploadProduct(@Valid @RequestBody Product product, Errors errors) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		
		Product uploadedProduct = service.uploadProduct(product);
		
		return ResponseEntity.status(HttpStatus.OK).body(uploadedProduct);
	}
	
	@GetMapping("/{slug}")
	public ResponseEntity<Product> getProductBySlug(@PathVariable UUID slug) {
		System.out.println("Slug:" + slug);
		Product product = service.getProductBySlug(slug);
		
		return ResponseEntity.ok(product);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProduct(
		@PathVariable Long id) {
		service.deleteProduct(id);

		return ResponseEntity.ok("Product deleted successfully");
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Product> updateProduct(
		@PathVariable Long id,
		@Valid @RequestBody Product product,
		Errors errors
	) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		
		Product updatedProduct = service.updateProduct(id, product);
		
		return ResponseEntity.ok(updatedProduct);
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
