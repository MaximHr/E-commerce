package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.dto.PageResponse;
import com.fmi.springcourse.server.dto.order.OrderResponseDto;
import com.fmi.springcourse.server.dto.order.UpdateOrderStatusRequest;
import com.fmi.springcourse.server.service.OrderService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {
	private final OrderService orderService;
	
	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}
	
	@GetMapping
	public PageResponse<OrderResponseDto> getAllOrders(
		@PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
		Pageable pageable) {
		
		return orderService.getAllOrders(pageable);
	}
	
	@PatchMapping("/status/{id}")
	public ResponseEntity<String> updateStatus(
		@PathVariable Long id,
		@RequestBody UpdateOrderStatusRequest request) {
		
		orderService.updateStatus(id, request.status());
		
		return ResponseEntity.ok("Status changed successfully.");
	}
	
	@GetMapping("/revenue")
	public ResponseEntity<Long> getTotalRevenue() {
		return ResponseEntity.ok(orderService.getTotalRevenue());
	}
	
	@GetMapping("/items-sold")
	public ResponseEntity<Long> getTotalItemsSold() {
		return ResponseEntity.ok(orderService.getTotalItemsSold());
	}
}
