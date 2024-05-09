/**
 * Loading组件
 * 用于按需加载时过渡显示等
 */
import React from "react";
import "./index.less";
import { Spin } from 'antd';

export default function LoadingComponent(): JSX.Element {
  return (
    <div className="loading">
      <Spin style={{marginBottom:'20px'}} size="large"/>
      <div>加载中...</div>
    </div>
  );
}
