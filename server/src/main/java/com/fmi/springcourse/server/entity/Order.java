package com.fmi.springcourse.server.entity;

import com.fmi.springcourse.server.valueobject.Address;
import com.fmi.springcourse.server.valueobject.Client;
import com.fmi.springcourse.server.valueobject.OrderStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	
	@Embedded
	private Client client;
	
	@Embedded
	private Address address;
	
	@Column(nullable = false)
	private OrderStatus status;
	
	@Column(nullable = false)
	private Instant createdAt;
	
	@Column(nullable = false)
	private String stripeId;
	
	@Column(nullable = false)
	private long amountTotal;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> items = new ArrayList<>();
	
	protected Order() {
	}
	
	public Order(Client client, Address address, OrderStatus status, Instant createdAt, String stripeId,
	             long amountTotal) {
		this.client = client;
		this.address = address;
		this.status = status;
		this.createdAt = createdAt;
		this.stripeId = stripeId;
		this.amountTotal = amountTotal;
	}
	
	public long getId() {
		return id;
	}
	
	public long getAmountTotal() {
		return amountTotal;
	}
	
	public List<OrderItem> getItems() {
		return items;
	}
	
	public Client getClient() {
		return client;
	}
	
	public Address getAddress() {
		return address;
	}
	
	public OrderStatus getStatus() {
		return status;
	}
	
	public Instant getCreatedAt() {
		return createdAt;
	}
	
	public String getStripeId() {
		return stripeId;
	}
	
	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	
	public void setItems(List<OrderItem> items) {
		this.items = items;
	}
}
