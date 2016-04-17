export const logIn = (username, password) => {
	return {
		type: 'LOG_IN',
		username,  // success, info, warning or danger
		password,
	}
}