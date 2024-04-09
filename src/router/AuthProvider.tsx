/** 路由守卫鉴别权限 */

// 第三方库
import React from "react";
import { message } from "antd";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 类型声明
interface Props {
    children: ReactElement;
}

// 导入工具
import { getToken } from "../util/auth";
// 组件编写
const PrivateRoute = ({ children }: Props) => {
    const navigator = useNavigate();

    // 对比时间戳是否超过48小时
    function isPast48Hours(timestamp: number): boolean {
        // 获取当前时间戳
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // 计算时间差，单位为秒
        const timeDifference = currentTimestamp - timestamp;

        // 定义48小时的秒数
        const hours48InSeconds = 48 * 60 * 60;

        // 判断时间差是否超过48小时
        return timeDifference > hours48InSeconds;
    }

    useEffect(() => {
        try {
            const token: any = getToken();
            const tokenObj = JSON.parse(token);
            if (tokenObj === null || isPast48Hours(tokenObj.expired)) {
                message.warning("token过期,请重新登录");
                navigator(`/login`);
            }
        } catch (error) {
            message.warning("token过期,请重新登录");
            navigator(`/login`);
        }
    }, []);
    return <>{children}</>;
};

export default PrivateRoute;