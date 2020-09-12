import axios from "axios"
import NProgress from "nprogress"

const service = axios.create({
	baseURL: "http://192.168.0.57:3000/",
	timeout: 5000,
})

service.interceptors.request.use((config) => {
	NProgress.start()
	return config
})

service.interceptors.response.use((config) => {
	NProgress.done(true)
	return config
})

export default service
