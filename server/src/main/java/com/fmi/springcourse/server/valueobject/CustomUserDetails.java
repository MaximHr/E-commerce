package com.fmi.springcourse.server.valueobject;

import com.fmi.springcourse.server.entity.User;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
	private final User user;
	
	public CustomUserDetails(User user) {
		this.user = user;
	}
	
	public User getUser() {
		return user;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(
			new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
		);
	}
	
	@Override
	public @Nullable String getPassword() {
		return user.getHashedPassword();
	}
	
	@Override
	public String getUsername() {
		return user.getEmail();
	}
	
	@Override
	public String toString() {
		return "CustomUserDetails{" +
			"user=" + user +
			'}';
	}
}
