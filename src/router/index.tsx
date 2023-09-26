import React from "react";
import Login from "../components/Login";
import Layout from "../components/Layout"

const routes:any = [
    {
        path: "/login", element: <Login />, isHome: true
    },
    {
        path: "/",
        element: <Layout />
    }
  ]

export default routes