package com.fmi.springcourse.server.exception.util;

import com.fmi.springcourse.server.exception.InvalidEntityDataException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.Errors;

import java.util.List;

public class CustomExceptionHandler {
	public static void handleValidationErrors(Errors errors) {
		List<String> messages = errors
			.getAllErrors()
			.stream()
			.map(DefaultMessageSourceResolvable::getDefaultMessage)
			.toList();
		
		throw new InvalidEntityDataException(messages);
	}
}
