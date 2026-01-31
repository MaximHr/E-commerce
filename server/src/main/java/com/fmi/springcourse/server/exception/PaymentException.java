package com.fmi.springcourse.server.exception;

public class PaymentException extends RuntimeException {
	public PaymentException(String message) {
		super(message);
	}
	
	public PaymentException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public PaymentException(Throwable cause) {
		super(cause);
	}
	
	public PaymentException() {
	}
}
