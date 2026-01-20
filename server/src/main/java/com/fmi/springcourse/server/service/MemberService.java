package com.fmi.springcourse.server.service;

import com.fmi.springcourse.server.dto.UserDtoRequest;
import com.fmi.springcourse.server.dto.UserDtoResponse;
import com.fmi.springcourse.server.entity.User;
import com.fmi.springcourse.server.valueobject.Role;

import java.util.List;

public interface MemberService {
	UserDtoResponse addMember(UserDtoRequest request);
	
	void kickMember(long userId, User currentUser);
	
	void changeRole(long userId, Role newRole);
	
	List<UserDtoResponse> listAllMembers();
}
