package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.PageResponse;
import com.fmi.springcourse.server.dto.order.OrderItemDto;
import com.fmi.springcourse.server.dto.order.OrderResponseDto;
import com.fmi.springcourse.server.dto.product.ProductListDto;
import com.fmi.springcourse.server.entity.Order;
import com.fmi.springcourse.server.entity.OrderItem;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.repository.OrderItemRepository;
import com.fmi.springcourse.server.repository.OrderRepository;
import com.fmi.springcourse.server.service.OrderService;
import com.fmi.springcourse.server.valueobject.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	
	public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
		this.orderRepository = orderRepository;
		this.orderItemRepository = orderItemRepository;
	}
	
	@Override
	@Transactional(readOnly = true)
	public PageResponse<OrderResponseDto> getAllOrders(Pageable pageable) {
		Page<Order> res = orderRepository.findAllWithItemsAndProducts(pageable);
		
		List<OrderResponseDto> list = res.getContent()
			.stream()
			.map(this::mapToDto)
			.toList();
		
		return new PageResponse<>(list, res.getTotalElements(), res.getTotalPages());
	}
	
	private OrderResponseDto mapToDto(Order order) {
		return new OrderResponseDto(
			order.getId(),
			order.getClient(),
			order.getAddress(),
			order.getStatus(),
			order.getCreatedAt(),
			order.getStripeId(),
			order.getAmountTotal(),
			order.getItems().stream()
				.map(this::mapItem)
				.toList()
		);
	}
	
	private OrderItemDto mapItem(OrderItem item) {
		ProductListDto productDto = new ProductListDto(item.getProduct());
		
		return new OrderItemDto(
			item.getId(),
			item.getQuantity(),
			productDto
		);
	}
	
	@Override
	public void updateStatus(Long orderId, OrderStatus status) {
		Order order = orderRepository.findById(orderId)
			.orElseThrow(() -> new EntityNotFoundException("Order not found"));
		
		order.setStatus(status);
		orderRepository.save(order);
	}
	
	@Override
	public long getTotalRevenue() {
		return orderRepository.getTotalRevenue();
	}
	
	@Override
	public long getTotalItemsSold() {
		return orderItemRepository.getTotalItemsSold();
	}
}
