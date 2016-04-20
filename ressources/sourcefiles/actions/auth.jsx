export const authenticate = (authToken) => {
	return {
		type: 'AUTHENTICATE',
		authToken
	}
}
