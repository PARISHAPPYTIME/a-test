import request from "../utils/request"

export function getCode(itemId) {
	let defaultReqUrl = `/v2/code/${itemId ? itemId : 20}`
	return request({ url: defaultReqUrl })
}

export function uploadFile(params) {
	let defaultReqUrl = `/api/a/code/saveCode`
	return request.post(defaultReqUrl, params)
}

// 获取导航的内容列表
export function getMenuList() {
	let defaultReqUrl = `/api/a/data/getMenuList`
	return request({ url: defaultReqUrl })
}

// 获取代码组的内容列表
export function getCodeList() {
	let defaultReqUrl = `/api/a/data/getCodeList`
	return request({ url: defaultReqUrl })
}

export function saveCode(params) {
	let defaultReqUrl = `/api/a/code/saveCode`
	return request.post(defaultReqUrl, params)
}

// 用户信息区
export function githubLogin(code) {
	let defaultReqUrl = `/api/github/user_info?code=${code}`
	return request({ url: defaultReqUrl })
}

// github api 接口
// github 列表搜索
export function getGitHubList(key) {
	let data = key || "react"
	let defaultReqUrl = `https://api.github.com/search/repositories`
	return request({
		url: defaultReqUrl,
		params: { q: data, sort: "stars", order: "desc" },
	})
}

// 测试 redux 的 api 接口
export function testRedux() {
	let defaultReqUrl = `http://jsonplaceholder.typicode.com/posts`
	return request(defaultReqUrl)
}
