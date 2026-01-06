package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.dto.Response;
import com.fmi.springcourse.server.dto.UserDtoRequest;
import com.fmi.springcourse.server.exception.InvalidEntityDataException;
import com.fmi.springcourse.server.exception.util.CustomExceptionHandler;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.dto.LoginRequest;
import com.fmi.springcourse.server.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private final AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}
	
	@PostMapping("/login")
	public ResponseEntity<Response<String>> login(@RequestBody LoginRequest request) {
		String token = authService.login(request);
		
		return ResponseEntity
			.status(HttpStatus.OK)
			.body(new Response<>(token));
	}
	
	@ExceptionHandler(AuthenticationException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ExceptionResponse authenticationExceptionHandler(AuthenticationException e) {
		return new ExceptionResponse(HttpStatus.UNAUTHORIZED, List.of(e.getMessage()));
	}
}
