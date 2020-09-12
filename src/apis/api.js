import request from "../utils/request"

export function getCode(itemId) {
	let defaultReqUrl = `/v2/code/${itemId ? itemId : 2}`
	return request({ url: defaultReqUrl })
}

export function uploadFile(params) {
	let defaultReqUrl = `/api/a/code/saveCode`
	return request.post(defaultReqUrl, params)
}

export function getMenuList() {
	let defaultReqUrl = `/api/a/data/getMenuList`
	return request({ url: defaultReqUrl })
}

export function saveCode(params) {
	let defaultReqUrl = `/api/a/code/saveCode`
	return request.post(defaultReqUrl, params)
}
