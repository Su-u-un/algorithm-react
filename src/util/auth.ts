const tokenKey:string = 'Auth_token'
const userInfoKey:string = 'userInfo'
const fileInfoKey:string = 'fileInfo'
const publicKey:string = 'publicInfo'

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

/** 文件信息保存 */
// 保存文件信息
export const setFileInfo = (info:string) => localStorage.setItem(fileInfoKey,info)
// 获取文件信息
export const getFileInfo = () => localStorage.getItem(fileInfoKey)
// 删除文件信息
export const delFileInfo = () => localStorage.removeItem(fileInfoKey)

/** 公共文件信息保存 */
// 保存公共文件信息
export const setPublicInfo = (info:string) => localStorage.setItem(publicKey,info)
// 获取公共文件信息
export const getPublicInfo = () => localStorage.getItem(publicKey)
// 删除公共文件信息
export const delPublicInfo = () => localStorage.removeItem(publicKey)