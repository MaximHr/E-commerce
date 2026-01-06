package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.UserDtoRequest;
import com.fmi.springcourse.server.dto.UserDtoResponse;
import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.exception.InvalidRoleException;
import com.fmi.springcourse.server.repository.UserRepository;
import com.fmi.springcourse.server.service.MemberService;
import com.fmi.springcourse.server.service.UserService;
import com.fmi.springcourse.server.valueobject.Role;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {
	private final UserService userService;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public MemberServiceImpl(UserService userService,
	                         UserRepository userRepository,
	                         PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	@Transactional
	public UserDtoResponse addMember(UserDtoRequest request) {
		if (request.getRole() == Role.OWNER) {
			throw new InvalidRoleException("There can be only one owner.");
		}
		
		if (userService.exists(request.getEmail())) {
			throw new EntityNotFoundException("User with this email already exists.");
		}
		
		String hashedPassword = passwordEncoder.encode(request.getPassword());
		User user = userRepository.save(
			new User(request.getEmail(), hashedPassword, request.getRole())
		);
		
		return new UserDtoResponse(user.getEmail(), user.getRole().toString(), user.getId());
	}
	
	@Override
	public String kickMember(long userId) {
		return "";
	}
	
	@Override
	public Role changeRole(long userId) {
		return null;
	}
}
