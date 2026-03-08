package com.fmi.springcourse.server.repository.impl;

import com.fmi.springcourse.server.entity.Order;
import com.fmi.springcourse.server.exception.OrderException;
import com.fmi.springcourse.server.exception.PaymentException;
import com.fmi.springcourse.server.repository.PaymentRepository;
import com.fmi.springcourse.server.valueobject.Address;
import com.fmi.springcourse.server.valueobject.Client;
import com.fmi.springcourse.server.valueobject.OrderDetails;
import com.fmi.springcourse.server.valueobject.OrderStatus;
import com.fmi.springcourse.server.valueobject.SessionInfo;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class StripePaymentRepository implements PaymentRepository {
	@Value("${stripe.webhook.secret}")
	private String webhookSecret;
	
	@Value("${store.url}")
	private String storeUrl;
	
	private static final String ISO_CURRENCY = "eur";
	private static final int CENTS_PER_UNIT = 100;
	private static final SessionCreateParams.ShippingAddressCollection ALLOWED_COUNTRIES =
		SessionCreateParams.ShippingAddressCollection.builder()
			.addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.BG)
			.addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.US)
			.addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.MK)
			.addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.GR)
			.build();
	
	@Override
	public String createPaymentSessionLink(Set<OrderDetails> orders) {
		try {
			SessionCreateParams params = generateSessionParams(orders);
			
			return Session.create(params).getUrl();
		} catch (StripeException e) {
			throw new PaymentException("Could not create a checkout session.", e);
		}
	}
	
	private SessionCreateParams generateSessionParams(Set<OrderDetails> orderDetails) {
		SessionCreateParams.Builder paramsBuilder =
			SessionCreateParams.builder()
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setShippingAddressCollection(ALLOWED_COUNTRIES)
				.setBillingAddressCollection(SessionCreateParams.BillingAddressCollection.REQUIRED)
				.setSuccessUrl(getSuccessUrl())
				.setCancelUrl(getCancelUrl());
		
		for (var order : orderDetails) {
			paramsBuilder.addLineItem(generateItem(order));
			paramsBuilder.putMetadata(
				String.valueOf(order.product().getId()),
				String.valueOf(order.quantity())
			);
		}
		
		return paramsBuilder.build();
	}
	
	private SessionCreateParams.LineItem generateItem(OrderDetails orderDetails) {
		return SessionCreateParams.LineItem.builder()
			.setQuantity(orderDetails.quantity())
			.setPriceData(
				SessionCreateParams.LineItem.PriceData.builder()
					.setCurrency(ISO_CURRENCY)
					.setUnitAmount(orderDetails.product()
						.getPrice()
						.multiply(BigDecimal.valueOf(CENTS_PER_UNIT))
						.longValueExact()
					)
					.setProductData(
						SessionCreateParams.LineItem.PriceData.ProductData.builder()
							.setName(orderDetails.product().getTitle())
							.build())
					.build())
			.build();
	}
	
	@Override
	public SessionInfo extractSessionInformation(String payload, String signatureHeader) {
		Event event = validateRequest(payload, signatureHeader);
		
		if (event.getType().equals("checkout.session.completed")) {
			StripeObject stripeObject = extractStripeObject(event);
			Session session = (Session) stripeObject;
			
			if (!session.getPaymentStatus().equals("paid")) {
				return null;
			}
			
			Session.CustomerDetails customerDetails = session.getCustomerDetails();
			com.stripe.model.Address stripeAddress = customerDetails.getAddress();
			
			var order = new Order(
				extractClient(customerDetails),
				extractAddress(stripeAddress),
				OrderStatus.AWAITING_FULFILLMENT,
				Instant.ofEpochSecond(session.getCreated()),
				session.getId(),
				session.getAmountTotal()
			);
			Map<Long, Integer> orderItemsMap = extractOrderItems(session.getMetadata());
			
			return new SessionInfo(order, orderItemsMap);
		}
		return null;
	}
	
	private Event validateRequest(String payload, String signatureHeader) {
		if (webhookSecret == null) {
			throw new OrderException("Invalid webhookSecret");
		}
		if (signatureHeader == null) {
			throw new OrderException("Invalid signatureHeader");
		}
		
		try {
			return Webhook.constructEvent(
				payload, signatureHeader, webhookSecret
			);
		} catch (SignatureVerificationException e) {
			throw new OrderException("Webhook error while validating signature.");
		}
	}
	
	private StripeObject extractStripeObject(Event event) {
		EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
		StripeObject stripeObject;
		
		if (dataObjectDeserializer.getObject().isPresent()) {
			stripeObject = dataObjectDeserializer.getObject().get();
		} else {
			throw new OrderException("Deserialization failed, probably due to an API version mismatch. " +
				"Refer to the Javadoc documentation on `EventDataObjectDeserializer` " +
				"for instructions on how to handle this case, or return an error here.");
		}
		
		return stripeObject;
	}
	
	private Client extractClient(Session.CustomerDetails customerDetails) {
		return new Client(
			customerDetails.getEmail(),
			customerDetails.getName()
		);
	}
	
	private Address extractAddress(com.stripe.model.Address stripeAddress) {
		return new Address(
			stripeAddress.getCountry(),
			stripeAddress.getCity(),
			stripeAddress.getLine1(),
			stripeAddress.getPostalCode()
		);
	}
	
	private Map<Long, Integer> extractOrderItems(Map<String, String> metadata) {
		return metadata.entrySet()
			.stream()
			.collect(Collectors.toMap(
				entry -> Long.parseLong(entry.getKey()),
				entry -> Integer.parseInt(entry.getValue())
			));
	}
	
	public String getSuccessUrl() {
		return storeUrl + "success";
	}
	
	public String getCancelUrl() {
		return storeUrl + "cancel";
	}
}
