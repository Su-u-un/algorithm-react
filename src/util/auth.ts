const tokenKey:string = 'Auth_token'
const userInfoKey:string = 'userInfo'

/** token保存 */
// 保存token
export const setToken = (token:string) => localStorage.setItem(tokenKey,token)
// 获取token
export const getToken = () => localStorage.getItem(tokenKey)
// 删除token
export const delToken = () => localStorage.removeItem(tokenKey)

/** 用户信息保存 */
// 保存用户信息
export const setUserInfo = (info:string) => localStorage.setItem(userInfoKey,info)
// 获取用户信息
export const getUserInfo = () => localStorage.getItem(userInfoKey)
// 删除用户信息
export const delUserInfo = () => localStorage.removeItem(userInfoKey)