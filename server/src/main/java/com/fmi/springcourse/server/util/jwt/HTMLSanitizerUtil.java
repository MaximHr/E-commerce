package com.fmi.springcourse.server.util.jwt;

import com.fmi.springcourse.server.entity.Product;
import org.owasp.html.HtmlPolicyBuilder;
import org.owasp.html.PolicyFactory;

public class HTMLSanitizerUtil {
	private static final  PolicyFactory POLICY = new HtmlPolicyBuilder()
		.allowElements("p", "b", "i", "u", "a")
		.allowAttributes("href").onElements("a")
		.allowElements("ul", "ol", "li")
		.allowElements("div", "span", "h1", "h2", "h3")
		.allowAttributes("style").onElements("div", "span")
		.toFactory();
	
	public static String sanitize(String unsanitizedString) {
		return POLICY.sanitize(unsanitizedString);
	}
	
	public static void sanitizeProductDetails(Product product) {
		String sanitisedDescription = POLICY.sanitize(product.getDescription());
		product.setDescription(sanitisedDescription);
	}
}
