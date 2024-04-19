import request from '../util/api'

export default{
    // === 登录 ===
    login: (data) => {
        return request({
          url: '/user/login',
          method: 'post',
          data: data
        })
      },
    // === 登录验证码 === 
    loginCaptcha: (data) => {
        return request({
          url: '/user/loginCaptcha',
          method: 'post',
          data: data
        })
    },
    // === 注册 ===
    register: (data) => {
        return request({
          url: '/user/register',
          method: 'post',
          data: data
        })
    },
    // === 注册验证码 ===
    registerCaptcha: (data) => {
        return request({
          url: '/user/registerCaptcha',
          method: 'post',
          data: data
        })
    }
}