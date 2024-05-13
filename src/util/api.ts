import axios from 'axios'
import { getToken,delFileInfo,delToken,delUserInfo } from './auth'

// 超时时间
axios.defaults.timeout = 100000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
axios.defaults.headers = {'Content-Type': 'application/json; charset=utf-8'}
// 对面暴露的基础请求路径
axios.defaults.baseURL = 'http://47.242.73.45:3000'

/**
 * 请求拦截
 */
axios.interceptors.request.use(config => {
  // 请求头带上token
  let token = getToken()
  if (token) {
      config.headers['Authorization'] = token
  }
  return config
}, error => {
  alert(error.response.data.mes)
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(res => {
  return res.data
}, error => {
   // 请求超时
  if (error.code === "ERR_NETWORK") {
    alert(error.message)
  }else if (error.response.status === 403 || error.response.status === 401) { // 需要重新登录
    alert(error.response.data.error)
    delToken()
    delUserInfo()
    delFileInfo()
    window.location.href = '/Auth'
  } else if (error.response.status === 404) { // 路径找不到
    alert('404 路径找不到' + ': ' + error.response.data.error)
  } else if (error.response.status === 503) {
    alert('503 服务不可用' + ': ' + error.response.data.error)
  } else if (error.response.status === 504) {
    alert('504 网络连接错误' + ': ' + error.response.data.error)
  } else {
    alert( error.response.data.error || error.response || error)
  }

  return Promise.reject(error)
})

// 配置axios
// axiosRetry(axios, {
//   retries: 3,  // 设置自动发送请求次数
//   retryCondition: () => {
//       // true为打开自动发送请求，false为关闭自动发送请求
//       // 这里的意思是当请求方式为get时打开自动发送请求功能
//     return false
//   }
// })
export default axios
