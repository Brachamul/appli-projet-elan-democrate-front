function auth(
	state={
		authToken: false,
		username: "Guest"
	}, action) {
	switch (action.type) {
		case LOG_IN :
			return { ...state, authToken: action.authToken }
		default : 
			return state
	}
}

export default auth