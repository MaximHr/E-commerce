package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.order.OrderDto;

import java.util.List;

public interface PaymentService {
	String createPaymentLink(List<OrderDto> orders);
	
	void acceptSuccessfulPayment(String payload, String signatureHeader);
}
