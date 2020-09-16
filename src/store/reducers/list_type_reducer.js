const listTypeReducer = (state = "code", action) => {
	if (action.type === "SET_LIST_TYPE") {
		return { ...state, type: action.payload }
	}
	return state
}

export default listTypeReducer
