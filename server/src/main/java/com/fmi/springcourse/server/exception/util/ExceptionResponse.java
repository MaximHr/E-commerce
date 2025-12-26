package com.fmi.springcourse.server.exception.util;

import org.springframework.http.HttpStatus;

import java.util.List;

public record ExceptionResponse(HttpStatus status, List<String> messages) {
}
