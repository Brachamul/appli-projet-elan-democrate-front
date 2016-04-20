export const newAlert = (level, text) => {
	return {
		type: 'NEW_ALERT',
		level,  // success, info, warning or danger
		text,
	}
}

export const onDismiss = (index) => {
	return {
		type: 'DISMISS_ALERT',
		index,
	}
}