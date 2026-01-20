package com.fmi.springcourse.server.exception;

public class EntityAlreadyExists extends RuntimeException {
	public EntityAlreadyExists(String message) {
		super(message);
	}
	
	public EntityAlreadyExists(String message, Throwable cause) {
		super(message, cause);
	}
	
	public EntityAlreadyExists(Throwable cause) {
		super(cause);
	}
	
	public EntityAlreadyExists() {
	}
}
