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
    saveFolder: (data) => {
      return request({
        url: '/file/saveFolder',
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
    // === 获取公共文件名 ===
    readFolderPublic:(data) => {
        return request({
            url: '/file/readFolderPublic',
            method: 'get',
            params: data
        })  
    },
    // === 删除folder ===
    deleteFolder:(data)=>{
        return request({
            url: '/file/deleteFolder',
            method: 'get',
            params: data
        })
    },
    // === 获取文件 ===
    readFile: (data) => {
        return request({
            url: '/file/readFile',
            method: 'get',
            params: data
        })
    },
    // === 获取子文件名 ===
    readFolder:(data) => {
        return request({
            url: '/file/readFolder',
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
    },
    // === saveAlgo ===
    saveAlgo: ({id,algotype,username}) => {
        return request({
            url: '/file/saveAlgo',
            method: 'post',
            data: {
                "id":id,
                "algotype":algotype,
                "username":username,
            }
        })
    },
    // 删除Algo
    deleteAlgo:(data) => {
        return request({
            url: '/file/deleteAlgo',
            method: 'get',
            params: data
        })
    },
    list:(data) => {
        return request({
            url: '/file/list',
            method: 'get',
            params: data
        })
    },
    getFileID:() => {
        return request({
            url: '/file/getFileID',
            method: 'get'
        })
    }
}