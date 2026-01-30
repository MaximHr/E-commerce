package com.fmi.springcourse.server.repository;

import com.fmi.springcourse.server.dto.CollectionResponseWithCount;
import com.fmi.springcourse.server.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
	@Query("SELECT c FROM Collection c LEFT JOIN FETCH c.products WHERE c.slug = :slug")
	Optional<Collection> findBySlugWithProducts(@Param("slug") UUID slug);
	
	@Query("SELECT c FROM Collection c JOIN c.products p WHERE p.id = :productId")
	List<Collection> findByProductId(@Param("productId") Long productId);
	
	@Query("""
		    SELECT c.id AS id, c.slug AS slug, c.imageUrl AS imageURL, c.title AS title,
				   COUNT(p) AS productsCount
		    FROM Collection c
		    LEFT JOIN c.products p
		    GROUP BY c.id
			ORDER BY c.createdAt DESC
		""")
	List<CollectionResponseWithCount> findAllWithProductCount();
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM colletctions_products WHERE collections_id = :collectionId", nativeQuery = true)
	void deleteCollectionAssociations(@Param("collectionId") Long collectionId);
}
