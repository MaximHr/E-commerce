package com.fmi.springcourse.server.valueobject;

public enum Role {
	OWNER, // has access to everything
	STORE_MANAGER, // does not have access to critical system settings
	PRODUCT_MANAGER, // does not have access to system settings, orders and sales
}
