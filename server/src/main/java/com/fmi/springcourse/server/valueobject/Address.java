package com.fmi.springcourse.server.valueobject;

import jakarta.persistence.Embeddable;

@Embeddable
public record Address(String country, String city, String address, String postalCode) {
	public Address {
		if (country == null) {
			throw new IllegalArgumentException("Provided country can not be null.");
		}
		if (city == null) {
			throw new IllegalArgumentException("Provided city can not be null.");
		}
		if (address == null) {
			throw new IllegalArgumentException("Provided address can not be null.");
		}
		if (postalCode == null) {
			throw new IllegalArgumentException("Provided postalCode can not be null.");
		}
	}
}
