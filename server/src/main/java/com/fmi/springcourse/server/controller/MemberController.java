package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.dto.UserDtoRequest;
import com.fmi.springcourse.server.dto.UserDtoResponse;
import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.exception.InvalidEntityDataException;
import com.fmi.springcourse.server.exception.InvalidRoleException;
import com.fmi.springcourse.server.exception.util.CustomExceptionHandler;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@Controller
@RequestMapping("members")
public class MemberController {
	private final MemberService memberService;
	
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	@PostMapping("/create-user")
	public UserDtoResponse createUser(@Valid @RequestBody UserDtoRequest user, Errors errors) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		
		return memberService.addMember(user);
	}
	
	@ExceptionHandler(InvalidEntityDataException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ExceptionResponse invalidEntityHandler(InvalidEntityDataException e) {
		return new ExceptionResponse(HttpStatus.BAD_REQUEST, e.getMessages());
	}
	
	@ExceptionHandler(InvalidRoleException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ExceptionResponse invalidRoleHandler(InvalidRoleException e) {
		return new ExceptionResponse(HttpStatus.BAD_REQUEST, List.of(e.getMessage()));
	}
}
