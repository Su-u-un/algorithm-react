/** 根路由 */

// 第三方库
import React,{useEffect, useState} from "react";
import { useRoutes } from "react-router-dom";
import Auth from "../pages/Auth";
import Layout from "../layout"

// 导入组件
import AuthProvider from './AuthProvider'

// 组件编写
const router = () => {
    return useRoutes(
        [
            {
                path: "/Auth", element: <Auth />
            },
            {
                path: "/",
                element: 
                <AuthProvider component={Layout}></AuthProvider>
            }
        ]
    ) 
  }

export default router