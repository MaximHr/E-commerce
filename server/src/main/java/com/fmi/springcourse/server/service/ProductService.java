package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.PageResponse;
import com.fmi.springcourse.server.dto.product.ProductDetails;
import com.fmi.springcourse.server.dto.product.ProductDetailsWithCollectionIds;
import com.fmi.springcourse.server.dto.product.ProductListDto;
import com.fmi.springcourse.server.dto.product.ProductRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
	ProductDetails uploadProduct(ProductRequest product);
	
	ProductDetails getProductDetailsBySlug(String slugString);
	
	ProductDetailsWithCollectionIds getProductBySlugWithCollectionIds(String slugString);
	
	ProductDetails updateProduct(Long id, ProductRequest newProduct);
	
	void deleteProduct(Long id);
	
	PageResponse<ProductListDto> listProducts(Pageable pageable);
	
	List<ProductListDto> getTopNMostSold(int n);
	
	List<ProductListDto> search(String query);
}
