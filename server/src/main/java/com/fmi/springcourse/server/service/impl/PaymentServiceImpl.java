package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.OrderDto;
import com.fmi.springcourse.server.entity.Product;
import com.fmi.springcourse.server.exception.PaymentException;
import com.fmi.springcourse.server.repository.PaymentRepository;
import com.fmi.springcourse.server.repository.ProductRepository;
import com.fmi.springcourse.server.service.PaymentService;
import com.fmi.springcourse.server.valueobject.OrderDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {
	private final PaymentRepository paymentRepository;
	private final ProductRepository productRepository;
	
	public PaymentServiceImpl(PaymentRepository paymentRepository, ProductRepository productRepository) {
		this.paymentRepository = paymentRepository;
		this.productRepository = productRepository;
	}
	
	@Override
	@Transactional(readOnly = true)
	public String createPaymentLink(List<OrderDto> orders) {
		Map<Long, Long> quantityMap = orders.stream()
			.collect(Collectors.toMap(
				OrderDto::productId,
				OrderDto::quantity
			));
		
		List<Product> products = productRepository.findAllById(quantityMap.keySet());
		
		Set<OrderDetails> orderDetails = products.stream()
			.map(product -> convertToOrder(product, quantityMap.get(product.getId())))
			.collect(Collectors.toSet());
		
		return paymentRepository.createPaymentSessionLink(orderDetails);
	}
	
	private OrderDetails convertToOrder(Product product, Long quantity) {
		if (quantity <= 0) {
			throw new PaymentException("Quantity must be a positive number.");
		}
		if (product.getQuantity() < quantity) {
			throw new PaymentException(
				"Could not proceed to checkout. There are only "
					+ product.getQuantity() + " " + product.getTitle() + " in stock"
			);
		}
		
		return new OrderDetails(
			product,
			quantity
		);
	}
}
