package com.fmi.springcourse.server.repository;

import com.fmi.springcourse.server.valueobject.OrderDetails;

import java.util.Set;

public interface PaymentRepository {
	String createPaymentSessionLink(Set<OrderDetails> orders);
}
