package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.LoginRequest;

public interface AuthService {
	String login(LoginRequest request);
}