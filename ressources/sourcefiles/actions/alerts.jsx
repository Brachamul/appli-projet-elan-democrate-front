export const newAlert = (level, text) => {
	return {
		type: 'NEW_ALERT',
		level,  // success, info, warning or danger
		text,
	}
}

export const removeAlert = (index) => {
	return {
		type: 'REMOVE_ALERT',
		index,
	}
}