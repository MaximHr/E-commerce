package com.fmi.springcourse.server.exception;

public class ImageDeletionException extends RuntimeException {
	public ImageDeletionException(String message) {
		super(message);
	}
	
	public ImageDeletionException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public ImageDeletionException(Throwable cause) {
		super(cause);
	}
	
	public ImageDeletionException() {
	}
}
