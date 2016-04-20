import { combineReducers } from 'redux'
import alerts from './alerts'
import auth from './auth'

const rootAppReducers = combineReducers({
	authState: auth,
	alertsState: alerts,
})

export default rootAppReducers