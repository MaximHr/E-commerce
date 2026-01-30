package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.user.LoginRequest;
import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.exception.EntityNotFoundException;
import com.fmi.springcourse.server.util.jwt.JwtUtil;
import com.fmi.springcourse.server.service.AuthService;
import com.fmi.springcourse.server.valueobject.CustomUserDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	public AuthServiceImpl(
		AuthenticationManager authenticationManager,
		JwtUtil jwtUtil
	) {
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
	}
	
	@Override
	public String login(LoginRequest request) {
		Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				request.username(),
				request.password()
			)
		);
		
		return jwtUtil.generateToken(authentication.getName());
	}
	
	@Override
	public User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
			CustomUserDetails userDetails =  (CustomUserDetails) authentication.getPrincipal();
			
			return userDetails.getUser();
		}
		throw new EntityNotFoundException("Can not find specified user.");
	}
}
