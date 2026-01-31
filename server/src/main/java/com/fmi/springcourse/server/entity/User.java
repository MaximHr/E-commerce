package com.fmi.springcourse.server.entity;

import com.fmi.springcourse.server.valueobject.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(
	name = "users",
	indexes = {
		@Index(name = "email_index", columnList = "email")
	}
)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(unique = true, nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String hashedPassword;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	protected User() {
	}
	
	public User(String email, String hashedPassword, Role role) {
		this.email = email;
		this.hashedPassword = hashedPassword;
		this.role = role;
	}
	
	public String getEmail() {
		return email;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getHashedPassword() {
		return hashedPassword;
	}
	
	public Role getRole() {
		return role;
	}
	
	public void setRole(Role role) {
		this.role = role;
	}
	
	@Override
	public String toString() {
		return "User{" +
			"role=" + role +
			", email='" + email + '\'' +
			", id=" + id +
			'}';
	}
	
	@Override
	public boolean equals(Object o) {
		if (!(o instanceof User user)) return false;
		return Objects.equals(id, user.id);
	}
	
	@Override
	public int hashCode() {
		return Objects.hashCode(id);
	}
}
