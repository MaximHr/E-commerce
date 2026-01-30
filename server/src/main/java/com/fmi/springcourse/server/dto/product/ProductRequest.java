package com.fmi.springcourse.server.dto.product;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;

import static com.fmi.springcourse.server.entity.Product.MAX_DESCRIPTION_LENGTH;

public class ProductRequest {
	public static final int MAX_TITLE_LENGTH = 100;
	public static final int MIN_DESCRIPTION_LENGTH = 5;
	public static final int MAX_PRICE_DIGITS = 10;
	
	@NotBlank(message = "Title cannot be blank")
	@Size(max = MAX_TITLE_LENGTH, message = "Title must be at most {max} characters long")
	private final String title;
	
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
	private final BigDecimal price;
	
	@NotNull(message = "Quantity cannot be null")
	@Min(value = 0, message = "Quantity cannot be negative")
	private final Integer quantity;
	
	@Size(
		min = MIN_DESCRIPTION_LENGTH,
		max = MAX_DESCRIPTION_LENGTH,
		message = "Description must be between {min} and {max} characters long"
	)
	private final String description;
	
	@DecimalMin(value = "0", message = "Discount cannot be negative")
	@DecimalMax(value = "100", message = "Discount cannot be more than 100")
	private final BigDecimal discount;
	
	@NotNull(message = "Images cannot be null")
	private List<@NotBlank(message = "Image URL cannot be blank") String> images;
	
	private final long[] collectionsIds;
	
	public ProductRequest(String title, BigDecimal price, Integer quantity, String description,
	                      BigDecimal discount, List<String> images, long[] collectionsIds) {
		this.title = title;
		this.price = price;
		this.quantity = quantity;
		this.description = description;
		this.discount = discount;
		this.images = images;
		this.collectionsIds = collectionsIds;
	}
	
	public String getTitle() {
		return title;
	}
	
	public long[] getCollectionsIds() {
		return collectionsIds;
	}
	
	public BigDecimal getPrice() {
		return price;
	}
	
	public Integer getQuantity() {
		return quantity;
	}
	
	public String getDescription() {
		return description;
	}
	
	public BigDecimal getDiscount() {
		return discount;
	}
	
	public List<String> getImages() {
		return images;
	}
	
	public void setImages(List<String> images) {
		this.images = images;
	}
}

