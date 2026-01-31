package com.fmi.springcourse.server.dto.order;

import com.fmi.springcourse.server.valueobject.OrderStatus;

public record UpdateOrderStatusRequest(OrderStatus status) {
}
