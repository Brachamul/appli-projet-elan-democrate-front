import React, { PropTypes } from 'react'
import { Input, ButtonInput, } from 'react-bootstrap'
import Title from '../components/Title'

const LoginForm = ({title, titleLevel, fields, isFetching, authToken, setFormFieldValue, logIn }) => (
	<form onSubmit={e => { e.preventDefault(); logIn(fields) } } role="form">
		<Title title={title} titleLevel={titleLevel} />
		<hr/>
		<Input
			name="username"
			onChange={e => setFormFieldValue("username", e.target.value)}
			label="Username:"
			type="text"
			maxLength="32"
			autoCapitalize="off"
			autoCorrect="off"
			autofocus=""
			/>
		<Input
			name="password"
			onChange={e => setFormFieldValue("password", e.target.value)}
			label="Password:"
			type="text"
			maxLength="64"
			autoCapitalize="off"
			autoCorrect="off"
			/>
		<ButtonInput type="submit" value="Log in" bsStyle="primary" block />
	</form>
)


LoginForm.propTypes = {
	logIn: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	titleLevel: PropTypes.number.isRequired
}



export default LoginForm