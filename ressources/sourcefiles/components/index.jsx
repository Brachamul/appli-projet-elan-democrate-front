import React, { PropTypes } from 'react'
import { Grid, } from 'react-bootstrap'
import Header from '../components/Header'
import Alerts from '../components/Alerts'
import LoginFormContainer from '../containers/LoginFormContainer'

const RootAppComponent = () => (
	<LoginPage/>
)

const LoginPage = () => (
	<div className="loginPage">
		<Header/>
		<Grid fluid>
			<div className="potato">Potato!</div>
			<div className="row-fluid">
				<Alerts />
				<LoginFormContainer title="Connexion" titleLevel={1} authURL="/obtain-auth-token/" />
			</div>
		</Grid>
	</div>
)

export default RootAppComponent