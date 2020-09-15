import { combineReducers } from "redux"
import counterReducer from "./reducers/counter_reducer"
import postReducer from "./reducers/request_reducer"

const rootReducers = combineReducers({
	counter: counterReducer, // counterReducer 代表要执行的操作
	post: postReducer,
})

export default rootReducers
