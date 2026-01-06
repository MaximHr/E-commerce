package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.repository.UserRepository;
import com.fmi.springcourse.server.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username)
		throws UsernameNotFoundException {
		
		User user = userRepository.findByEmail(username)
			.orElseThrow(() -> new UsernameNotFoundException("User not found."));
		
		return org.springframework.security.core.userdetails.User
			.withUsername(user.getEmail())
			.password(user.getHashedPassword())
			.roles(user.getRole().name())
			.build();
	}
	
	@Override
	public boolean exists(String email) {
		return userRepository.existsByEmail(email);
	}
}

