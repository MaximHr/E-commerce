package com.fmi.springcourse.server.repository.impl;

import com.fmi.springcourse.server.exception.PaymentException;
import com.fmi.springcourse.server.repository.PaymentRepository;
import com.fmi.springcourse.server.valueobject.OrderDetails;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Set;

@Repository
public class StripePaymentRepository implements PaymentRepository {
	@Value("${store.url}")
	private String storeUrl;
	//TODO
	//	private final String successUrl = storeUrl + "success";
	// private final String cancelUrl = storeUrl + "cancel";
	private final String successUrl = "https://doroty.netlify.app/" + "success";
	private final String cancelUrl = "https://doroty.netlify.app/" + "cancel";
	
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
			
			return Session.create(params)
				.getUrl();
		} catch (StripeException e) {
			System.out.println(e.getMessage());
			throw new PaymentException("Could not create a checkout session.", e);
		}
	}
	
	private SessionCreateParams generateSessionParams(Set<OrderDetails> orderDetails) {
		SessionCreateParams.Builder paramsBuilder =
			SessionCreateParams.builder()
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setShippingAddressCollection(ALLOWED_COUNTRIES)
				.setSuccessUrl(successUrl)
				.setCancelUrl(cancelUrl);
		
		for (var order : orderDetails) {
			paramsBuilder.addLineItem(generateItem(order));
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
}
