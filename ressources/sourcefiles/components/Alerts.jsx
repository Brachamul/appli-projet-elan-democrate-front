import React from 'react'
import { Alert, } from 'react-bootstrap'

	// alert timestamp ?
	
const Alerts = ({ alerts, onDismiss }) => (
	<div className="alerts">
		{alerts.map(alert =>
			<Alert bsStyle={alert.level} key={alert.id} onDismiss={() => { onDismiss(alert.id) }} >
				{alert.text}
			</Alert>
		)}
	</div>
)

export default Alerts