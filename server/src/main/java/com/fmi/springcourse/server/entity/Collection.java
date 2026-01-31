package com.fmi.springcourse.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(
	name = "collections",
	indexes = {
		@Index(name = "collection_slug_index", columnList = "slug")
	}
)
public class Collection {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	
	@Column(updatable = false, nullable = false, unique = true)
	private final UUID slug = UUID.randomUUID();
	
	private String imageUrl;
	
	private String title;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "colletctions_products")
	private final Set<Product> products = new HashSet<>();
	
	@CreatedDate
	@Column(updatable = false)
	private final Instant createdAt = Instant.now();
	
	protected Collection() {
	
	}
	
	public Collection(String imageUrl, String title) {
		this.imageUrl = imageUrl;
		this.title = title;
	}
	
	public Instant getCreatedAt() {
		return createdAt;
	}
	
	public Set<Product> getProducts() {
		return products;
	}
	
	public long getId() {
		return id;
	}
	
	public UUID getSlug() {
		return slug;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	@Override
	public boolean equals(Object o) {
		if (!(o instanceof Collection that)) return false;
		return id == that.id;
	}
	
	@Override
	public int hashCode() {
		return Objects.hashCode(id);
	}
}
