package com.fmi.springcourse.server.exception;

import java.util.Collections;
import java.util.List;

public class InvalidEntityDataException extends RuntimeException {
	private List<String> messages = List.of();
	
	public InvalidEntityDataException(String message) {
		super(message);
	}
	
	public InvalidEntityDataException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public InvalidEntityDataException(Throwable cause) {
		super(cause);
	}
	
	public InvalidEntityDataException(Throwable cause, List<String> messages) {
		super(cause);
		this.messages = messages;
	}
	
	public InvalidEntityDataException(String message, Throwable cause, List<String> messages) {
		super(message, cause);
		this.messages = messages;
	}
	
	public InvalidEntityDataException(List<String> messages) {
		this.messages = messages;
	}
	
	public List<String> getMessages() {
		return Collections.unmodifiableList(messages);
	}
}
