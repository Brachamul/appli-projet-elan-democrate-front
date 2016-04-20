import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { authenticate } from '../actions/auth'
import axios from 'axios'

const mapStateToProps = (state) => {
	return {
		authToken: state.authState.authToken,
		username: state.authState.username,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSubmit: (e) => { // (username, password)
			e.preventDefault()
			axios.post(apiRoot + ownProps.authURL, {
				username: "Brachamul", // ownProps.username
				password: "purple14"
			}).then(response => {
				dispatch(authenticate("Token " + response.data.token))
			}).catch(response => {
				console.log(response)
			})
		}
	}
}

const LoginFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)

export default LoginFormContainer