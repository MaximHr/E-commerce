package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.PageResponse;
import com.fmi.springcourse.server.dto.order.OrderResponseDto;
import com.fmi.springcourse.server.valueobject.OrderStatus;
import org.springframework.data.domain.Pageable;

public interface OrderService {
	PageResponse<OrderResponseDto> getAllOrders(Pageable pageable);
	
	void updateStatus(Long orderId, OrderStatus status);
	
	long getTotalRevenue();
	
	long getTotalItemsSold();
}
