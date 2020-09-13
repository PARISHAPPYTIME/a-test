import axios from 'axios'
import NProgress from 'nprogress'
import { message } from 'antd'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    NProgress.start()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (config) => {
    NProgress.done(true)
    return config
  },
  (error) => {
    // Do something with response error
    NProgress.done(true)
    message.error('网络可能出了一点小问题~')
    return Promise.reject(error)
  }
)

export default service
