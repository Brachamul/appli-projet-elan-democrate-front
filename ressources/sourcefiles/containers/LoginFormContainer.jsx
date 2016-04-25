import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { setFormFieldValue, logIn, } from '../actions/auth'

const mapStateToProps = (state, ownProps) => {
	return {
		fields: state.authState.fields,
		isFetching: state.authState.isFetching,
		authToken: state.authState.authToken,
	}
}

const LoginFormContainer = connect(
	mapStateToProps,
	{ setFormFieldValue, logIn }
)(LoginForm)

export default LoginFormContainer