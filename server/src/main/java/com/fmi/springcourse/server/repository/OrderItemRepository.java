package com.fmi.springcourse.server.repository;

import com.fmi.springcourse.server.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
	@Query("""
           SELECT COALESCE(SUM(oi.quantity), 0)
           FROM OrderItem oi
           """)
	long getTotalItemsSold();
}
