import request from '../util/api'

export default {
    // === 构建 ===
    build: (data: object) => {
        return request({
            url: '/file/build',
            method: 'post',
            data: data
        })
    },
    delete:(data: object) => {
        return request({
            url: '/file/delete',
            method: 'get',
            params: data
        })
    },
    saveFolder: (data: object) => {
      return request({
        url: '/file/saveFolder',
        method: 'post',
        data: data
      })  
    },
    // === 获取公共文件 ===
    readPublic: (data: object) => {
        return request({
            url: '/file/readPublic',
            method: 'get',
            params: data
        })
    },
    // === 获取公共文件名 ===
    readFolderPublic:(data: object) => {
        return request({
            url: '/file/readFolderPublic',
            method: 'get',
            params: data
        })  
    },
    // === 删除folder ===
    deleteFolder:(data: object)=>{
        return request({
            url: '/file/deleteFolder',
            method: 'get',
            params: data
        })
    },
    // === 获取文件 ===
    readFile: (data: object) => {
        return request({
            url: '/file/readFile',
            method: 'get',
            params: data
        })
    },
    // === 获取子文件名 ===
    readFolder:(data: object) => {
        return request({
            url: '/file/readFolder',
            method: 'get',
            params: data
        })
    },
    // === 保存 ===
    save : ({filename,content,realurl ='',folderid = ''}:any) => {
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
    saveAlgo: ({id,algotype,username}:any) => {
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
    deleteAlgo:(data: object) => {
        return request({
            url: '/file/deleteAlgo',
            method: 'get',
            params: data
        })
    },
    list:(data: object) => {
        return request({
            url: '/file/list',
            method: 'get',
            params: data
        })
    },
    getFolderID:() => {
        return request({
            url: '/file/getFolderID',
            method: 'get'
        })
    }
}