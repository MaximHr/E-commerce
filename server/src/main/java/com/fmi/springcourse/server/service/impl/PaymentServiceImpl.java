package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.order.OrderDto;
import com.fmi.springcourse.server.entity.OrderItem;
import com.fmi.springcourse.server.entity.Product;
import com.fmi.springcourse.server.exception.OrderException;
import com.fmi.springcourse.server.exception.PaymentException;
import com.fmi.springcourse.server.repository.OrderRepository;
import com.fmi.springcourse.server.repository.PaymentRepository;
import com.fmi.springcourse.server.repository.ProductRepository;
import com.fmi.springcourse.server.service.PaymentService;
import com.fmi.springcourse.server.valueobject.OrderDetails;
import com.fmi.springcourse.server.valueobject.SessionInfo;
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
	private final OrderRepository orderRepository;
	
	public PaymentServiceImpl(PaymentRepository paymentRepository, ProductRepository productRepository,
	                          OrderRepository orderRepository) {
		this.paymentRepository = paymentRepository;
		this.productRepository = productRepository;
		this.orderRepository = orderRepository;
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
		System.out.println(products);
		Set<OrderDetails> orderDetails = products.stream()
			.map(product -> convertToOrder(product, quantityMap.get(product.getId())))
			.collect(Collectors.toSet());
		
		var link = paymentRepository.createPaymentSessionLink(orderDetails);
		
		return link;
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
	
	@Override
	@Transactional
	public void acceptSuccessfulPayment(String payload, String signatureHeader) {
		SessionInfo sessionInfo = paymentRepository
			.extractSessionInformation(payload, signatureHeader);
		
		System.out.println("sessionInfo");
		System.out.println(sessionInfo);
		
		if (sessionInfo != null) {
			Set<Long> productIds = sessionInfo.orderItemsMap()
				.keySet();
			List<Product> products = productRepository.findAllById(productIds);
			
			System.out.println(products);
			
			List<OrderItem> orderItems = products.stream()
				.map(product -> convertToOrderItem(product, sessionInfo))
				.toList();
			
			System.out.println(orderItems);
			
			sessionInfo.orderItemsMap()
				.forEach(productRepository::decreaseQuantity);
			
			sessionInfo.order()
				.setItems(orderItems);
			
			orderRepository.save(sessionInfo.order());
		}
	}
	
	private OrderItem convertToOrderItem(Product product, SessionInfo sessionInfo) {
		if (product.getQuantity() < sessionInfo.orderItemsMap().get(product.getId())) {
			throw new OrderException("More items than they are in stock have been bought!");
		}
		
		return new OrderItem(
			sessionInfo.order(),
			product,
			sessionInfo.orderItemsMap().get(product.getId())
		);
	}
}
