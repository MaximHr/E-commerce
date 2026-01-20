package com.fmi.springcourse.server.security.jwt;

import com.fmi.springcourse.server.service.impl.UserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private static final String BEARER = "Bearer ";
	private final JwtUtil jwtUtil;
	private final UserServiceImpl userDetailsService;
	
	public JwtAuthenticationFilter(JwtUtil jwtUtil,
	                               UserServiceImpl userDetailsService) {
		this.jwtUtil = jwtUtil;
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
	                                FilterChain filterChain) throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		
		if (header != null && header.startsWith(BEARER)) {
			String token = header.substring(BEARER.length());
			String username = jwtUtil.extractUsername(token);
			
			if (username != null
				&& SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				
				if (jwtUtil.validateToken(token, userDetails)) {
					var auth = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities()
					);
					auth.setDetails(
						new WebAuthenticationDetailsSource().buildDetails(request)
					);
					SecurityContextHolder.getContext().setAuthentication(auth);
				}
			}
		}
		
		filterChain.doFilter(request, response);
	}
}