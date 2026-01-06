package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.dto.LoginRequest;
import com.fmi.springcourse.server.security.jwt.JwtUtil;
import com.fmi.springcourse.server.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
}
