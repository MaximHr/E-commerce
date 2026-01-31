package com.fmi.springcourse.server.repository;

import com.fmi.springcourse.server.valueobject.OrderDetails;

import com.fmi.springcourse.server.valueobject.SessionInfo;

import java.util.Set;

public interface PaymentRepository {
	String createPaymentSessionLink(Set<OrderDetails> orders);
	
	SessionInfo extractSessionInformation(String payload, String signatureHeader);
}
