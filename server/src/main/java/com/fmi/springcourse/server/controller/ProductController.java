package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.dto.PageResponse;
import com.fmi.springcourse.server.dto.product.ProductDetails;
import com.fmi.springcourse.server.dto.product.ProductDetailsWithCollectionIds;
import com.fmi.springcourse.server.dto.product.ProductListDto;
import com.fmi.springcourse.server.dto.product.ProductRequest;
import com.fmi.springcourse.server.exception.util.CustomExceptionHandler;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("products")
public class ProductController {
	private final ProductService service;
	
	public ProductController(ProductService service) {
		this.service = service;
	}
	
	@GetMapping("/")
	public PageResponse<ProductListDto> listProducts(Pageable pageable) {
		return service.listProducts(pageable);
	}
	
	@GetMapping("/search")
	public List<ProductListDto> searchProducts(@RequestParam("q") String query) {
		return service.search(query);
	}
	
	@PostMapping("/")
	public ResponseEntity<ProductDetails> createProduct(@Valid @RequestBody ProductRequest product,
	                                                    Errors errors) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		ProductDetails uploadedProduct = service.uploadProduct(product);
		
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(uploadedProduct);
	}
	
	@GetMapping("/{slug}")
	public ResponseEntity<ProductDetails> getProductBySlug(@PathVariable String slug) {
		ProductDetails product = service.getProductDetailsBySlug(slug);
		
		return ResponseEntity.ok(product);
	}
	
	@GetMapping("/withCollectionIds/{slug}")
	public ResponseEntity<ProductDetailsWithCollectionIds> getProductBySlugWithCollectionIds(
		@PathVariable String slug) {
		ProductDetailsWithCollectionIds product = service.getProductBySlugWithCollectionIds(slug);
		
		return ResponseEntity.ok(product);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
		service.deleteProduct(id);
		
		return ResponseEntity.ok("Product deleted successfully");
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ProductDetails> updateProduct(
		@PathVariable Long id,
		@Valid @RequestBody ProductRequest product,
		Errors errors
	) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		
		ProductDetails updatedProduct = service.updateProduct(id, product);
		
		return ResponseEntity.ok(updatedProduct);
	}
	
	@GetMapping("/most-sold/{n}")
	public List<ProductListDto> getTopNMostSold(@PathVariable int n) {
		return service.getTopNMostSold(n);
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ExceptionResponse illegalArgumentHandler(IllegalArgumentException e) {
		return new ExceptionResponse(HttpStatus.BAD_REQUEST, List.of(e.getMessage()));
	}
	
}
