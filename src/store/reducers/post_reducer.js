// export const counterReducer = function (state = { con: 1 }, actions) {
// return {
// 	...state,
// 	con: state.con + 1,
// }
// }

const postReducer = (state = { list: [] }, action) => {
	switch (action.type) {
		case "LOAD_POST":
			return {
				...state,
				list: action.payload,
			}
		default:
			return state
	}
}

export default postReducer
