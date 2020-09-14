import { testRedux } from "../../apis/api"

export const loadPostsAction = async (dispatch) => {
	// testRedux
	const res = await testRedux()
	dispatch({
		type: "LOAD_POST",
		payload: res.data,
	})
}
