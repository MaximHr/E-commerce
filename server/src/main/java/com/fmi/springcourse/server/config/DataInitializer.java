package com.fmi.springcourse.server.config;

import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.repository.UserRepository;
import com.fmi.springcourse.server.valueobject.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
	@Value("${admin.email}")
	private String adminEmail;
	
	@Value("${admin.password}")
	private String adminPassword;
	
	@Bean
	CommandLineRunner initUsers(UserRepository userRepository,
	                            PasswordEncoder passwordEncoder) {
		return _ -> {
			if (userRepository.count() == 0) {
				String pass = passwordEncoder.encode(adminPassword);
				Role role = Role.OWNER;
				
				User admin = new User(adminEmail, pass, role);
				
				userRepository.save(admin);
			}
		};
	}
}