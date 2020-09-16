import { combineReducers } from "redux"
// import listTypeReducer from "./reducers/list_type_reducer"
import postReducer from "./reducers/request_reducer"

const rootReducers = combineReducers({
	// listType: listTypeReducer, // listTypeReducer 代表要执行的操作
	data: postReducer,
})

export default rootReducers
