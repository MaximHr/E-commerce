package com.fmi.springcourse.server.repository;

import com.fmi.springcourse.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long> {
	@Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.slug =:slug")
	Optional<Product> findBySlugWithImages(@Param("slug") UUID slug);
	
	@EntityGraph(attributePaths = "images")
	Page<Product> findAll(Pageable pageable);
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM colletctions_products WHERE products_id = :productId", nativeQuery = true)
	void deleteProductAssociations(@Param("productId") Long productId);
	
	@Modifying
	@Query("""
		    UPDATE Product p
		    SET p.quantity = p.quantity - :quantity
		    WHERE p.id = :productId AND p.quantity >= :quantity
		""")
	int decreaseQuantity(@Param("productId") Long productId, @Param("quantity") int quantity);
	
	@Query("""
		    SELECT p
		    FROM Product p
		    JOIN OrderItem oi ON oi.product.id = p.id
		    GROUP BY p
		    ORDER BY SUM(oi.quantity) DESC
		""")
	List<Product> findTopSellingProducts(Pageable pageable);
}
