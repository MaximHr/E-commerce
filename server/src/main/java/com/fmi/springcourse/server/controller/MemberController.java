package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.dto.Response;
import com.fmi.springcourse.server.dto.UserDtoRequest;
import com.fmi.springcourse.server.dto.UserDtoResponse;
import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.exception.EntityAlreadyExists;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.exception.InvalidEntityDataException;
import com.fmi.springcourse.server.exception.InvalidRoleException;
import com.fmi.springcourse.server.exception.util.CustomExceptionHandler;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.service.AuthService;
import com.fmi.springcourse.server.service.MemberService;
import com.fmi.springcourse.server.valueobject.Role;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("members")
public class MemberController {
	private final MemberService memberService;
	private final AuthService authService;
	
	public MemberController(MemberService memberService, AuthService authService) {
		this.memberService = memberService;
		this.authService = authService;
	}
	
	@PostMapping("/create-user")
	public UserDtoResponse createUser(@Valid @RequestBody UserDtoRequest user, Errors errors) {
		if (errors.hasErrors()) {
			CustomExceptionHandler.handleValidationErrors(errors);
		}
		
		return memberService.addMember(user);
	}
	
	@GetMapping("/me")
	public UserDtoResponse getProfileInfo() {
		User user = authService.getCurrentUser();
		
		return new UserDtoResponse(user.getEmail(), user.getRole().toString(), user.getId());
	}
	
	@GetMapping("/list")
	public List<UserDtoResponse> listMembers() {
		return memberService.listAllMembers();
	}
	
	@DeleteMapping("/{id}")
	public Response<String> kickMember(@PathVariable long id) {
		User currentUser = authService.getCurrentUser();
		
		memberService.kickMember(id, currentUser);
		
		return new Response<>("Member kicked successfully.");
	}
	
	@PatchMapping("/update-role/{id}")
	public Response<String> updateRole(@PathVariable long id, @RequestBody String role) {
		memberService.changeRole(id, Role.valueOf(role));
		
		return new Response<>("Role updated successfully.");
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
	
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(EntityNotFoundException.class)
	public ExceptionResponse entityNotFoundHandler(EntityNotFoundException e) {
		return new ExceptionResponse(HttpStatus.NOT_FOUND, List.of(e.getMessage()));
	}
	
	@ResponseStatus(HttpStatus.CONFLICT)
	@ExceptionHandler(EntityAlreadyExists.class)
	public ExceptionResponse entityNotFoundHandler(EntityAlreadyExists e) {
		return new ExceptionResponse(HttpStatus.CONFLICT, List.of(e.getMessage()));
	}
}
