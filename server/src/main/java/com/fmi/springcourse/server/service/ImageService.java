package com.fmi.springcourse.server.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
	List<String> upload(List<MultipartFile> images);
	
	void remove(String id);
}
