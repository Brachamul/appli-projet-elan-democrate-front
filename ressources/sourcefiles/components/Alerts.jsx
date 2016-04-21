import React from 'react'
import { Alert, } from 'react-bootstrap'

function alertContent() { return {__html: alert.text} }

const Alerts = ({ alerts=[{level: 'warning', text:'<p>Warning message!</p>'}], onDismiss }) => (
	<div className="alerts">
		{alerts.map(alert =>
			<Alert
				bsStyle={alert.level}
				key={alert.id}
				onDismiss={onDismiss}
				dangerouslySetInnerHTML={alertContent}
				></Alert>
		)}
	</div>
)

export default Alerts