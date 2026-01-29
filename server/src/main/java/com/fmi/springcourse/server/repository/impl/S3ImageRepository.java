package com.fmi.springcourse.server.repository.impl;

import com.fmi.springcourse.server.exception.ImageDeletionException;
import com.fmi.springcourse.server.exception.ImageUploadException;
import com.fmi.springcourse.server.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Repository
public class S3ImageRepository implements ImageRepository {
	private static final String FOLDER = "image/";
	private final S3Client client;
	@Value("${r2.bucket-name}")
	private String bucketName;
	
	public S3ImageRepository(S3Client client) {
		this.client = client;
	}
	
	@Override
	public List<String> upload(List<MultipartFile> images) {
		List<String> urls = new ArrayList<>(images.size());
		
		for (MultipartFile image : images) {
			urls.add(putObject(image));
		}
		
		return Collections.unmodifiableList(urls);
	}
	
	@Override
	public void delete(String id) {
		try {
			DeleteObjectRequest request = DeleteObjectRequest.builder()
				.bucket(bucketName)
				.key(FOLDER + id)
				.build();
			
			client.deleteObject(request);
		} catch (S3Exception e) {
			throw new ImageDeletionException("Could not delete image", e);
		}
	}
	
	private String putObject(MultipartFile file) {
		try {
			String uuid = UUID.randomUUID().toString();
			String key = FOLDER + uuid;
			
			PutObjectRequest putObjectRequest = PutObjectRequest.builder()
				.bucket(bucketName)
				.key(key)
				.contentType(file.getContentType())
				.build();
			
			client.putObject(
				putObjectRequest,
				RequestBody.fromBytes(file.getBytes())
			);
			
			return uuid;
		} catch (IOException | S3Exception e) {
			System.out.println(e.getMessage());
			throw new ImageUploadException("Could not upload image", e);
		}
	}
}
