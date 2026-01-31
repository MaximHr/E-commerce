package com.fmi.springcourse.server.dto.order;

import com.fmi.springcourse.server.dto.product.ProductListDto;

public record OrderItemDto(Long id,
                           int quantity,
                           ProductListDto product
) {

}
