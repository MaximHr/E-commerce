package com.fmi.springcourse.server.dto.user;

import com.fmi.springcourse.server.valueobject.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UserDtoRequest {
	private static final int PASSWORD_MIN_LENGTH = 8;
	
	@Email(message = "Please provide a valid email.")
	private final String email;
	
	@Size(min = PASSWORD_MIN_LENGTH, message = "Password must be at least 8 characters.")
	private final String password;
	
	private final Role role;
	
	public UserDtoRequest(String email, String password, Role role) {
		this.email = email;
		this.password = password;
		this.role = role;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public Role getRole() {
		return role;
	}
	
	@Override
	public String toString() {
		return "UserDto{" +
			"email='" + email + '\'' +
			", password='" + password + '\'' +
			", role=" + role +
			'}';
	}
}
