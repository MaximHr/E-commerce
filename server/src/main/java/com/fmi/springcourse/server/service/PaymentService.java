package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.OrderDto;

import java.util.List;

public interface PaymentService {
	String createPaymentLink(List<OrderDto> orders);
}
