import React, { PropTypes } from 'react'

const Alerts = ({ alerts, onDismiss }) => (
	<div className="alerts">
		{alerts.map(alert =>
			<Alert bsStyle={alert.level} key={alert.id} onDismiss={onDismiss} >
				{todo.text}
			</Alert>
		)}
	</div>
)

export default Alerts