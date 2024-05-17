- 项目中react-split-pane依赖包需要修改，2.0.3版本通过npm install react-split-pane@next安装
  源文件没有导出pane组件，需要修改导出并更新d.ts。
- 项目未修复bug
  - play时，切换算法仍然play，需要监听是否切换算法，取消play的定时器。
  - 目录树未校验子文件和文件夹的重复key