package com.fmi.springcourse.server.dto.order;

import com.fmi.springcourse.server.valueobject.Address;
import com.fmi.springcourse.server.valueobject.Client;
import com.fmi.springcourse.server.valueobject.OrderStatus;

import java.time.Instant;
import java.util.List;

public record OrderResponseDto(long id,
                               Client client,
                               Address address,
                               OrderStatus status,
                               Instant createdAt,
                               String stripeId,
                               long amountTotal,
                               List<OrderItemDto> items) {

}
