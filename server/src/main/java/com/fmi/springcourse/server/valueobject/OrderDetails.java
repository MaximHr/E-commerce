package com.fmi.springcourse.server.valueobject;

import com.fmi.springcourse.server.entity.Product;

import java.util.Objects;

public record OrderDetails(Product product, long quantity) {
	@Override
	public boolean equals(Object o) {
		if (!(o instanceof OrderDetails that)) return false;
		return Objects.equals(product, that.product);
	}
	
	@Override
	public int hashCode() {
		return Objects.hashCode(product);
	}
}
