export interface LogInPayload {
	email: string,
	password: string
}

export interface SignUpPayload {
	email: string,
	password: string,
	role: string
}