package com.fmi.springcourse.server.repository;

import com.fmi.springcourse.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findBySlug(UUID slug);
	
	Page<Product> findAll(Pageable pageable);
	
}
