function auth(
	state={
		authToken: false,
		username: "Guest" // gotta update this yeah ?
	}, action) {
	switch (action.type) {
		case 'AUTHENTICATE' :
			return { ...state, authToken: action.authToken }
		default : 
			return state
	}
}

export default auth