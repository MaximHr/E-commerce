package com.fmi.springcourse.server.valueobject;

import jakarta.persistence.Embeddable;

@Embeddable
public record Client(String email, String name) {
	public Client {
		if (email == null) {
			throw new IllegalArgumentException("Provided email can not be null.");
		}
		if (name == null) {
			name = "Sir/Madam";
		}
	}
}
