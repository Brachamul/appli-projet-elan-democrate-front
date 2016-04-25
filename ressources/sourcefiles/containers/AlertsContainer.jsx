import { connect } from 'react-redux'
import Alerts from '../components/Alerts'
import { onDismiss } from '../actions/alerts'

const mapStateToProps = (state, ownProps) => {
	return {
		alerts: state.alertsState
	}
}

const AlertsContainer = connect(
	mapStateToProps,
	{onDismiss}
)(Alerts)

export default AlertsContainer