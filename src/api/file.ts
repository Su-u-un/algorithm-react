import request from '../util/api'

export default {
    // === 构建 ===
    build: (data) => {
        return request({
            url: '/file/build',
            method: 'post',
            data: data
        })
    },
    // === 获取公共文件 ===
    readPublic: (data) => {
        return request({
            url: '/file/readPublic',
            method: 'get',
            params: data
        })
    },
    // === 删除 ===
    
    // === 获取文件 ===
    readFile: (data) => {
        return request({
            url: '/file/readFile',
            method: 'get',
            params: data
        })
    },
    // === 保存 ===
    save : ({filename,content,realurl ='',folderid = ''}) => {
        return request({
            url: '/file/save',
            method: 'post',
            data: {
                "filename":filename,
                "content":content,
                "realurl":realurl,
                "folderid":folderid
            }
        })
    }
    // === 保存算法===
}