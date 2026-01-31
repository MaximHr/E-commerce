package com.fmi.springcourse.server.dto.order;

import java.util.Objects;

public record OrderDto(long productId, long quantity) {
	@Override
	public boolean equals(Object o) {
		if (!(o instanceof OrderDto orderDto)) return false;
		return productId == orderDto.productId;
	}
	
	@Override
	public int hashCode() {
		return Objects.hashCode(productId);
	}
}
