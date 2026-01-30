package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.UserDtoRequest;
import com.fmi.springcourse.server.dto.UserDtoResponse;
import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.exception.EntityAlreadyExists;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.exception.InvalidRoleException;
import com.fmi.springcourse.server.repository.UserRepository;
import com.fmi.springcourse.server.service.MemberService;
import com.fmi.springcourse.server.service.UserService;
import com.fmi.springcourse.server.valueobject.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
			throw new EntityAlreadyExists("User with this email already exists.");
		}
		
		String hashedPassword = passwordEncoder.encode(request.getPassword());
		User user = userRepository.save(
			new User(request.getEmail(), hashedPassword, request.getRole())
		);
		
		return new UserDtoResponse(user.getEmail(), user.getRole().toString(), user.getId());
	}
	
	@Override
	public void kickMember(long userId, User currentUser) {
		if (currentUser.getId() == userId) {
			throw new InvalidRoleException("You can not kick yourself.");
		}
		
		userRepository.deleteById(userId);
	}
	
	@Override
	public void changeRole(long userId, Role newRole) {
		if (newRole == Role.OWNER) {
			throw new InvalidRoleException("There can be only one owner");
		}
		
		User user = userRepository
			.findById(userId)
			.orElseThrow(() -> new EntityNotFoundException("No user found."));
		
		if (user.getRole() == Role.OWNER) {
			throw new InvalidRoleException("Owner can not be demoted.");
		}
		
		user.setRole(newRole);
		userRepository.save(user);
	}
	
	@Override
	public List<UserDtoResponse> listAllMembers() {
		return userRepository.findAll()
			.stream()
			.map(user -> new UserDtoResponse(
				user.getEmail(),
				user.getRole().toString(),
				user.getId()
			))
			.toList();
	}
}
