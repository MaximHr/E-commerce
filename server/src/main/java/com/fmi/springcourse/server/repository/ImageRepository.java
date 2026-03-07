package com.fmi.springcourse.server.repository;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageRepository {
	List<String> uploadMultipleImages(List<MultipartFile> images);
	
	String singleImageUpload(MultipartFile file);
	
	void delete(String id);
}
