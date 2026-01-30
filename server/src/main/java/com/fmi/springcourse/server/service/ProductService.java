package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.PageResponse;
import com.fmi.springcourse.server.dto.ProductDetails;
import com.fmi.springcourse.server.dto.ProductDetailsWithCollectionIds;
import com.fmi.springcourse.server.dto.ProductListDTO;
import com.fmi.springcourse.server.dto.ProductRequest;
import org.springframework.data.domain.Pageable;

public interface ProductService {
	ProductDetails uploadProduct(ProductRequest product);
	
	ProductDetails getProductDetailsBySlug(String slugString);
	
	ProductDetailsWithCollectionIds getProductBySlugWithCollectionIds(String slugString);
	
	ProductDetails updateProduct(Long id, ProductRequest newProduct);
	
	void deleteProduct(Long id);
	
	PageResponse<ProductListDTO> listProducts(Pageable pageable);
}
