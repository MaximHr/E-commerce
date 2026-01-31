package com.fmi.springcourse.server.valueobject;

import java.util.Locale;

public enum Role {
	OWNER, // has access to everything. There can be only one owner
	STORE_MANAGER, // does not have access to critical system settings
	PRODUCT_MANAGER; // does not have access to system settings and orders and sales
	
	@Override
	public String toString() {
		String str = name().substring(0, 1).toUpperCase() +
			name().substring(1).toLowerCase(Locale.ROOT);
		
		return str.replace("_", " ");
	}
}
