package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.UserDtoRequest;
import com.fmi.springcourse.server.dto.UserDtoResponse;
import com.fmi.springcourse.server.valueobject.Role;

public interface MemberService {
	UserDtoResponse addMember(UserDtoRequest request);
	
	String kickMember(long userId);
	
	Role changeRole(long userId);
	
}
