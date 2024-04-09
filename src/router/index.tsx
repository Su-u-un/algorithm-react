/** 根路由 */

// 第三方库
import React,{useEffect, useState} from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layout"

// 导入组件
import AuthProvider from './AuthProvider'

// 导入工具
import { getUserInfo } from "@/util/auth";

// 组件编写
const router = () => {
    // const [routes,setRoutes] = useState<Array<any>>([])
    
    // // 获取用户文件信息，生成路由
    // useEffect(() => {
    //     const userInfo:Array<any> = JSON.parse(getUserInfo()!)


    //     setRoutes()
    // },[])

    return useRoutes(
        [
            {
                path: "/login", element: <Login />
            },
            {
                path: "/",
                element: <AuthProvider>
                    <Layout />
                </AuthProvider>
            }
        ]
    ) 
  }

export default router