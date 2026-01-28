package com.fmi.springcourse.server.repository;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageRepository {
	List<String> upload(List<MultipartFile> images);
	
	void delete(String id);
}
