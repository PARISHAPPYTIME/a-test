const counterReducer = (state = 0, action = { span: 1 }) => {
	return state + action.span
}

export default counterReducer
