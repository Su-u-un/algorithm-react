import React from "react";
import Login from "../pages/Login";
import Layout from "../layout"
import Test from "../components/Test";

const routes:any = [
    {
        path: "/login", element: <Login />, isHome: true
    },
    {
        path: "/",
        element: <Layout></Layout>
    }
  ]

export default routes