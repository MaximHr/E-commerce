package com.fmi.springcourse.server.valueobject;

import com.fmi.springcourse.server.entity.Order;

import java.util.Map;

public record SessionInfo(Order order, Map<Long, Integer> orderItemsMap) {
}
