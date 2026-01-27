package com.fmi.springcourse.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.CreatedDate;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
	indexes = {
		@Index(name = "slug_index", columnList = "slug")
	}
)
public class Product {
	public static final int MAX_TITLE_LENGTH = 100;
	public static final int MAX_DESCRIPTION_LENGTH = 10_000;
	public static final int MIN_DESCRIPTION_LENGTH = 10;
	public static final int MAX_PRICE_DIGITS = 10;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@NotBlank(message = "Title cannot be blank")
	@Size(max = MAX_TITLE_LENGTH, message = "Title must be at most {max} characters long")
	private String title;
	
	@NotNull(message = "Price cannot be null")
	@DecimalMin(
		value = "0.0",
		inclusive = false,
		message = "Price must be greater than 0"
	)
	@Digits(
		integer = MAX_PRICE_DIGITS,
		fraction = 2,
		message = "Price must have up to {integer} digits and 2 decimals"
	)
	private BigDecimal price;
	
	@NotNull(message = "Quantity cannot be null")
	@Min(value = 0, message = "Quantity cannot be negative")
	private Integer quantity;
	
	@Size(
		min = MIN_DESCRIPTION_LENGTH,
		max = MAX_DESCRIPTION_LENGTH,
		message = "Description must be between {min} and {max} characters long"
	)
	private String description;
	
	@DecimalMin("0")
	@DecimalMax("100")
	private BigDecimal discount;
	
	@Column(updatable = false, nullable = false, unique = true)
	private final UUID slug = UUID.randomUUID();
	
	@CreatedDate
	@Column(updatable = false)
	private final Instant createdAt = Instant.now();
	
	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> images;
	
	protected Product() {
	}
	
	public Product(String title, BigDecimal price, Integer quantity, String description, BigDecimal discount) {
		this.title = title;
		this.price = price;
		this.quantity = quantity;
		this.description = description;
		this.discount = discount;
	}
	
	public Long getId() {
		return id;
	}
	
	public BigDecimal getDiscount() {
		return discount;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}
	
	public BigDecimal getPrice() {
		return price;
	}
	
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	public Integer getQuantity() {
		return quantity;
	}
	
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public UUID getSlug() {
		return slug;
	}
	
	public Instant getCreatedAt() {
		return createdAt;
	}
	
	public List<String> getImages() {
		return images;
	}
	
	public void setImages(List<String> images) {
		this.images = images;
	}
}
