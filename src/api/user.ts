import request from '../util/api'

export default{
    // === 登录 ===
    login: (data: object) => {
        return request({
          url: '/user/login',
          method: 'post',
          data: data
        })
      },
    // === 登录验证码 === 
    loginCaptcha: (data: object) => {
        return request({
          url: '/user/loginCaptcha',
          method: 'post',
          data: data
        })
    },
    // === 注册 ===
    register: (data: object) => {
        return request({
          url: '/user/register',
          method: 'post',
          data: data
        })
    },
    // === 注册验证码 ===
    registerCaptcha: (data: object) => {
        return request({
          url: '/user/registerCaptcha',
          method: 'post',
          data: data
        })
    }
}