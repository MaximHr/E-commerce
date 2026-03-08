package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.dto.order.OrderDto;
import com.fmi.springcourse.server.dto.Response;
import com.fmi.springcourse.server.exception.PaymentException;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {
	private final PaymentService paymentService;
	
	public PaymentController(PaymentService paymentService) {
		this.paymentService = paymentService;
	}
	
	@PostMapping("/create-link")
	public Response<String> createPayment(@RequestBody List<OrderDto> orders) {
		String link = paymentService.createPaymentLink(orders);
		
		return new Response<>(link);
	}
	
	@PostMapping("/webhook")
	public ResponseEntity<String> acceptWebhook(@RequestBody String payload,
	                                            @RequestHeader("Stripe-Signature") String signatureHeader) {
		System.out.println("webhook");
		System.out.println(payload);
		paymentService.acceptSuccessfulPayment(payload, signatureHeader);
		System.out.println("after");
		
		return ResponseEntity.ok("");
	}
	
	@ExceptionHandler(PaymentException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ExceptionResponse paymentExceptionHandler(PaymentException e) {
		return new ExceptionResponse(HttpStatus.BAD_REQUEST, List.of(e.getMessage()));
	}
}
