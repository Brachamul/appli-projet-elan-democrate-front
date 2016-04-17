import { combineReducers } from 'redux'
import 'alerts' from './alerts'
import 'auth' from './auth'

const rootApp = combineReducers({
	auth,
	alerts,
})

export default rootApp