/** 根路由 */

// 第三方库
import React,{useEffect, useState} from "react";
import { useRoutes,Navigate } from "react-router-dom";
import loadable from "@loadable/component";

// 导入组件
import AuthProvider from './AuthProvider'
import Loading from "../components/Loading";
import {Tracer,Array1DTracer,Array2DTracer,ChartTracer,GraphTracer,LogTracer} from "../pages/Tracer"
import {Layout, VerticalLayout,HorizontalLayout } from "../pages/Layout"
// 异步加载各路由模块
// ==================
const [
    NotFound,
    Auth,
    Home,
    BasicLayout
  ] = [
    () => import("../pages/ErrorPages/404"),
    () => import("../pages/Auth"),
    () => import("../pages/Home"),
    () => import("../layout")
  ].map((item) => {
    return loadable(item as any, {
      fallback: <Loading />,
    });
  });


// 组件编写
const router = () => {
    return useRoutes(
        [
            {
                path: "/Auth", element: <Auth />
            },
            {
                path:"/",
                element:<Navigate to='/Home'/>
            },
            {
                path: "/",
                element: <AuthProvider component={BasicLayout}></AuthProvider>,
                children: [
                    {
                        path: "Home", element: <Home />
                    },
                    {
                        path: "Tracer", element: <Tracer/>
                    },
                    {
                        path: "Array1DTracer", element: <Array1DTracer/>
                    },
                    {
                        path: "Array2DTracer", element: <Array2DTracer/>
                    },
                    {
                        path: "ChartTracer", element: <ChartTracer/>
                    },
                    {
                        path: "GraphTracer", element: <GraphTracer/>
                    },
                    {
                        path: "LogTracer", element: <LogTracer/>
                    },
                    {
                        path: "Layout",  element: <Layout/>
                    },
                    {
                        path: "HorizontalLayout", element: <HorizontalLayout/>
                    },
                    {
                        path: "VerticalLayout", element: <VerticalLayout/>
                    },
                    {
                        path:"*", element:<Navigate to='/404'/>
                    }
                ]
            },
            {
                path:"/404", element:<NotFound/>
            },
            {
                path:"*", element:<Navigate to='/404'/>
            }
        ]
    ) 
  }

export default router