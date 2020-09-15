const postReducer = (state = [], action) => {
	state = action.payload
	return {
		...state,
	}
}

export default postReducer
