package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.user.LoginRequest;
import com.fmi.springcourse.server.entity.User;

public interface AuthService {
	String login(LoginRequest request);
	
	User getCurrentUser();
}