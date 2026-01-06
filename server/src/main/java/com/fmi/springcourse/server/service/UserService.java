package com.fmi.springcourse.server.service;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
	boolean exists(String email);
}
