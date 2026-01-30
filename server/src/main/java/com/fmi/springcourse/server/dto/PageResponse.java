package com.fmi.springcourse.server.dto;

import java.util.List;

public record PageResponse<T>(List<T> content,
                              long totalElements,
                              int totalPages) {
}