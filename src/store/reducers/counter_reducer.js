import { stat } from "fs-extra"

const counterReducer = (state = { con: 1 }, action) => {
	switch (action.type) {
		case "COUNT_ADD":
			return {
				...state,
				con: state.con + 1,
			}
		default:
			return stat
	}
}

export default counterReducer
