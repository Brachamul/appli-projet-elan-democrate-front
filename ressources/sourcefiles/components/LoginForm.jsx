import React, { PropTypes } from 'react'
import { Input, ButtonInput, } from 'react-bootstrap'
import Title from '../components/Title'

const LoginForm = ({ onSubmit, title, titleLevel }) => (
	<form onSubmit={onSubmit} role="form">
		<Title title={title} titleLevel={titleLevel} />
		<hr/>			 
		<Input name="username" label="Username:" type="text" maxLength="30" autoCapitalize="off" autoCorrect="off" autofocus="" />
		<Input name="password" label="Password:" type="text" maxLength="72" autoCapitalize="off" autoCorrect="off" />
		<ButtonInput type="submit" value="Log in" bsStyle="primary" block />
	</form>
)

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	titleLevel: PropTypes.number.isRequired
}

export default LoginForm