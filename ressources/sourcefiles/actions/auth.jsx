import axios from 'axios'
import { newAlert, } from '../actions/alerts'

export const setFormFieldValue = (fieldName, fieldValue) => {
	return {
		type: 'SET_FORM_FIELD_VALUE',
		fieldName,
		fieldValue,
	}
}

export const setFieldError = (fieldName, errorText) => {

}

export const loginUserRequest = () => {
	return {
		type: 'LOGIN_USER_REQUEST'
	}
	// remove all alerts
}

export const loginUserSuccess = (authToken) => {
	return {
		type: 'LOGIN_USER_SUCCESS',
		authToken,
	}
}

export const loginUserFailure = (error) => {
	return {
		type: 'LOGIN_USER_FAILURE',
		status: error.response.status,
		statusText: error.response.statusText,
	}
}

export const logIn = (fields) => {
	console.log(`logging in with username ${fields.username} and password ${fields.password}`)
	return dispatch => {
		return axios.post('http://localhost:8000/obtain-auth-token/', fields
		).then(response => {
			console.log(response)
			dispatch(loginUserSuccess("Token " + response.data.token))
			console.log(response.data.token)
		}).catch(response => {
			for (let property in response.data) {
				let value = response.data[property]
				if (property == 'non_field_errors') { dispatch(newAlert('danger', value )) } 
				if (fields[property] !== 'undefined') { dispatch(fieldError(property, value )) } // dispatch error text to fields
			}
		})
	}
}