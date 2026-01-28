package com.fmi.springcourse.server.service.impl;

import com.fmi.springcourse.server.exception.ImageUploadException;
import com.fmi.springcourse.server.repository.ImageRepository;
import com.fmi.springcourse.server.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Service
public class ImageServiceImpl implements ImageService {
	@Value("${spring.servlet.multipart.max-file-size}")
	private DataSize maxImageSize;
	
	private static final Set<String> ALLOWED_TYPES = Set.of(
		"image/jpeg",
		"image/png",
		"image/webp"
	);
	private final ImageRepository imageRepository;
	
	public ImageServiceImpl(ImageRepository imageRepository) {
		this.imageRepository = imageRepository;
	}
	
	@Override
	public List<String> upload(List<MultipartFile> images) {
		for (MultipartFile img : images) {
			if (!isCorrectFileSize(img)) {
				throw new ImageUploadException("Image "
					+ img.getName()
					+ " size must be at most "
					+ maxImageSize.toMegabytes()
				);
			}
			if (!isCorrectType(img)) {
				throw new ImageUploadException("Invalid content type.");
			}
		}
		
		return imageRepository.upload(images);
	}
	
	@Override
	public void remove(String id) {
		imageRepository.delete(id);
	}
	
	private boolean isCorrectFileSize(MultipartFile file) {
		return file.getSize() <= maxImageSize.toBytes();
	}
	
	private boolean isCorrectType(MultipartFile file) {
		String contentType = file.getContentType();
		
		return contentType != null && ALLOWED_TYPES.contains(contentType);
	}
}
