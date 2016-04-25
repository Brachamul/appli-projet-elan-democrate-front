function auth(
	state={
		fields: 		{},
		isFetching: 	false,
		authToken: 		undefined,	// if success
	}, action) {
	switch (action.type) {
		case 'SET_FORM_FIELD_VALUE':
			return { ...state, fields: fields(state.fields, action) }
		case 'LOGIN_USER_REQUEST':
			return { ...state, isFetching: true }
		case 'LOGIN_USER_SUCCESS':
			return { ...state, isFetching: false, authToken: action.authToken }
		case 'LOGIN_USER_FAILURE':
			return { ...state, isFetching: false, status: action.status, statusText: action.statusText }
		default : 
			return state
	}
}

function fields(state={}, action) {
	switch (action.type) {
		case 'SET_FORM_FIELD_VALUE':
			return { ...state, [action.fieldName]: action.fieldValue }
	}
}

export default auth