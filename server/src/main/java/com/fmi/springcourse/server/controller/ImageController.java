package com.fmi.springcourse.server.controller;

import com.fmi.springcourse.server.exception.ImageUploadException;
import com.fmi.springcourse.server.exception.util.ExceptionResponse;
import com.fmi.springcourse.server.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {
	private final ImageService imageService;
	
	public ImageController(ImageService imageService) {
		this.imageService = imageService;
	}
	
	@PostMapping("/upload")
	public List<String> upload(@RequestParam("images") List<MultipartFile> images) {
		return imageService.upload(images);
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ImageUploadException.class)
	public ExceptionResponse imageUploadExceptionHandler(ImageUploadException e) {
		return new ExceptionResponse(HttpStatus.BAD_REQUEST, List.of(e.getMessage()));
	}
	
	@ResponseStatus(HttpStatus.CONTENT_TOO_LARGE)
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ExceptionResponse handleMaxSizeException(MaxUploadSizeExceededException e) {
		return new ExceptionResponse(HttpStatus.CONTENT_TOO_LARGE, List.of(e.getMessage()));
	}
}
