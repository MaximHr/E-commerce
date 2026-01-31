package com.fmi.springcourse.server.repository;

import com.fmi.springcourse.server.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
	@Query(value = """
        SELECT DISTINCT o FROM Order o
        LEFT JOIN FETCH o.items i
        LEFT JOIN FETCH i.product p
        """,
		countQuery = "SELECT COUNT(o) FROM Order o")
	Page<Order> findAllWithItemsAndProducts(Pageable pageable);
	
	@Query("SELECT COALESCE(SUM(o.amountTotal), 0) FROM Order o")
	Long getTotalRevenue();
}