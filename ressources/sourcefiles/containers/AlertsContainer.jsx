import { connect } from 'react-redux'
import { Alert, } from 'react-bootstrap'
import { onDismiss } from '../actions/alerts'

const mapStateToProps = (state) => {
	return {
		alerts: state.alertsState.alerts
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDismiss: (index) => {
			dispatch(onDismiss(index))
		}
	}
}

const AlertsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Alerts)

export default AlertsContainer