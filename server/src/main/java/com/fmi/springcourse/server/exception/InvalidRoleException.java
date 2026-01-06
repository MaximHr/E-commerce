package com.fmi.springcourse.server.exception;

public class InvalidRoleException extends RuntimeException {
	public InvalidRoleException(String message) {
		super(message);
	}
	
	public InvalidRoleException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public InvalidRoleException(Throwable cause) {
		super(cause);
	}
	
	public InvalidRoleException() {
	}
}
