import { testRedux } from "../../apis/api"

export const loadPostsAction = async (dispatch) => {
	// testRedux
	const res = await testRedux()
	console.log(res)
	dispatch({
		type: "LOAD_POST",
		payload: res.data,
	})
}

export const countAddAction = {
	type: 'COUNT_ADD',
}

export const countReduceAction = {
	type: 'COUNT_REDUCE'
}

