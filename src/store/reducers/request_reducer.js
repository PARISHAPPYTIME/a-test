let reducerMap = new Map([
	[
		"REQ_GET_GITHUB_LIST_ACTION",
		(state, action) => {
			const arr = action.payload.items
			const newArr = arr.map((item) => {
				return {
					href: item.clone_url,
					title: item.full_name,
					avatar: item.owner ? item.owner.avatar_url : "",
					description: item.description,
					stargazers_count: item.stargazers_count,
					language: item.language,
					watchers_count: item.watchers_count,
				}
			})
			return {
				...state,
				list: newArr,
			}
		},
	],
	[
		"REQ_GET_CODE_LIST_ACTION",
		(state, action) => {
			return {
				...state,
				list: action.payload,
			}
		},
	],
	[
		"REQ_GET_CODE_ACTION",
		(state, action) => {
			return {
				...state,
				res: action.payload,
			}
		},
	],
])

const postReducer = (
	state = {
		list: [],
		res: {},
	},
	action
) => {
	if (reducerMap.has(action.type)) {
		const fn = reducerMap.get(action.type)
		return fn(state, action)
	}
	return state
}

export default postReducer
