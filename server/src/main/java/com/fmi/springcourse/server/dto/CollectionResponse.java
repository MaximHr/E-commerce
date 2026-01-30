package com.fmi.springcourse.server.dto;

import java.util.UUID;

public class CollectionResponse {
	protected final Long id;
	protected final UUID slug;
	protected final String imageUrl;
	protected final String title;
	
	public CollectionResponse(Long id, UUID slug, String imageUrl, String title) {
		this.id = id;
		this.slug = slug;
		this.imageUrl = imageUrl;
		this.title = title;
	}
	
	public Long getId() {
		return id;
	}
	
	public UUID getSlug() {
		return slug;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public String getTitle() {
		return title;
	}
}
