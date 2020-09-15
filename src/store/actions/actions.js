import { getGitHubList, getCodeList, getCode } from "../../apis/api"

export const reqGetGitHubListAction = async (dispatch) => {
	const res = await getGitHubList()
	dispatch({
		type: "REQ_GET_GITHUB_LIST_ACTION",
		payload: res.data,
	})
}

export const reqGetCodeListAction = () => {
	return async (dispatch) => {
		const res = await getCodeList()
		dispatch({
			type: "REQ_GET_CODE_LIST_ACTION",
			payload: res.data.data,
		})
	}
}

export const reqGetCodeAction = (id) => {
	return async (dispatch) => {
		const res = await getCode(id)
		dispatch({
			type: "REQ_GET_CODE_ACTION",
			payload: res.data,
		})
	}
}
