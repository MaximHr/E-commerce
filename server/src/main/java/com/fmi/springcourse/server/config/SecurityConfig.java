package com.fmi.springcourse.server.config;

import com.fmi.springcourse.server.util.jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
	@Value("${admin.url}")
	private String adminUrl;
	
	@Value("${store.url}")
	private String storeUrl;
	
	private final JwtAuthenticationFilter jwtFilter;
	
	public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
		this.jwtFilter = jwtFilter;
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of(adminUrl, storeUrl));
		config.setAllowedMethods(List.of("GET", "PATCH", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(AbstractHttpConfigurer::disable)
			.sessionManagement(
				sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.authorizeHttpRequests(this::configureAuthorization)
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
	
	private void configureAuthorization(
		AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth
	) {
		auth
			.requestMatchers(HttpMethod.GET, "/collections/**").permitAll()
			.requestMatchers(HttpMethod.POST, "/collections/**").authenticated()
			.requestMatchers(HttpMethod.PUT, "/collections/*").authenticated()
			.requestMatchers(HttpMethod.DELETE, "/collections/**").authenticated()
			.requestMatchers(HttpMethod.GET, "/products/*").permitAll()
			.requestMatchers(HttpMethod.GET, "/products/withCollectionIds/*").authenticated()
			.requestMatchers(HttpMethod.POST, "/products/upload").authenticated()
			.requestMatchers(HttpMethod.DELETE, "/products/*").authenticated()
			.requestMatchers(HttpMethod.PUT, "/products/*").authenticated()
			.requestMatchers(HttpMethod.GET, "/members/me").authenticated()
			.requestMatchers(HttpMethod.POST, "/images/upload").authenticated()
			.requestMatchers(HttpMethod.DELETE, "/images/*").authenticated()
			.requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
			.requestMatchers(HttpMethod.GET, "/members/list").hasAnyRole("OWNER", "STORE_MANAGER")
			.requestMatchers(HttpMethod.POST, "/members/create-user").hasRole("OWNER")
			.requestMatchers(HttpMethod.DELETE, "/members/*").hasRole("OWNER")
			.requestMatchers(HttpMethod.PATCH, "/members/**").hasRole("OWNER")
			.requestMatchers(HttpMethod.POST, "/payments/create-link").permitAll()
			.requestMatchers(HttpMethod.POST, "/payments/webhook").permitAll()
			.requestMatchers(HttpMethod.GET, "/orders").hasAnyRole("OWNER", "STORE_MANAGER")
			.requestMatchers(HttpMethod.GET, "/orders/items-sold").hasAnyRole("OWNER", "STORE_MANAGER")
			.requestMatchers(HttpMethod.GET, "/orders/revenue").hasAnyRole("OWNER", "STORE_MANAGER")
			.requestMatchers(HttpMethod.PATCH, "/orders/status/*").hasAnyRole("OWNER", "STORE_MANAGER")
			.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
			.anyRequest().denyAll();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) {
		return config.getAuthenticationManager();
	}
}
