import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import styles from './Code.module.less'
import { debounce, cloneDeep, merge } from 'lodash';
import { Tabs, Button, Input, Dropdown,Modal,Menu } from 'antd';
import file from '../../api/file'
import { useDispatch, useSelector } from "react-redux";
import { setChunks, setCursor, setLineIndicator } from "../../store/play";
import { setBuilding } from "../../store/current"
import Editor from "../Editor";
import DropdownInput from "../DropdownInput";
import MoadlInput from "../MoadlInput";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const Code: React.FC = () => {
  const {confirm} = Modal
  const { files, folder_id, type } = useSelector(state => state.current)

  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState([]);
  const [activeText, setActiveText] = useState('')

  const menu = (
    <Menu>
      <Menu.Item onClick={(e) => menuClick(e,'edit')}>修改名称</Menu.Item>
      <Menu.Item onClick={(e) => menuClick(e,'delete')}>删除</Menu.Item>
    </Menu>
  )

  const menuClick = (e,key) => {
    console.log('拿不到父亲的state，能拿到redux的',files,items)
    e.domEvent.stopPropagation()
    if(key === 'edit') {
      confirm({
        title:'',
        content:<Input/>,
        okText:'确认',
        cancelText:'取消',
        onOk:()=>{
          console.log('修改'+activeKey);
        }
      });
    }
    else if(key === 'delete') {
      confirm({
        title:'',
        content:'确认删除吗?',
        okText:'确认',
        cancelText:'取消',
        onOk:()=>{
          console.log('删除'+activeKey);
        }
      });
    }
  }

  useEffect(() => {
    if (files.length) {
      const initialItems = files.map((file: any) => {
        return {
          label:  
          <Dropdown overlay={menu} trigger={["contextMenu"]}>
            <div>{file.name}</div>
          </Dropdown>,
          children: Editor({ data: file.content, onChange: (e: any) => handleChange(e) }),
          key: file.name,
          realurl:file.realurl,
          closable:false
        }
      })
      setActiveKey(initialItems[0].key)
      setActiveText(initialItems[0].children.props.value)
      setItems(initialItems)
    }
  }, [files])

  useEffect(() => {
    if (items.length) build()
  }, [items])

  const handleChange = useCallback(
    data => setActiveText(data)
    , [])

  const newTabIndex = useRef(0);

  const button = { left: <Button style={{ marginLeft: 8 }} onClick={build}>Build</Button>, right: <Button onClick={save}>Save</Button> }

  const dispatch = useDispatch()


  // 点击后把代码发送到服务器，接收返回的命令集
  async function build() {
    // 如果不是合法文件不进行构建
    if(activeKey.split('.')[activeKey.split('.').length-1] === 'md') return
    // 通知进度条置1
    dispatch(setBuilding(true))
    // 查找当前active的文件的真实地址，发给后端，后端读取本地文件进行构建。
    const temp = files.find((file) => file.name === activeKey)
    // 如果没有url，说明是新建文件，不做处理
    if(!temp) return

    // 判断是用户文件还是公共文件，如果是用户文件就保存再构建，如果公共文件直接发送构建
    if (type === 'list') {
      // 保存当前
      save()
      // 重置chart
      reset();
      try {
        const response = await file.build({
          'url': temp.realurl,
          'content': activeText
        });
        const commands = response.data
        reset(commands);
        dispatch(setCursor(1))
      } catch (error) {
        console.error(error);
      }
    }
    else {
      try {
        reset();
        const response = await file.build({
          'content': activeText
        });
        const commands = response.data
        reset(commands);
        dispatch(setCursor(1))
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 重置palyer参数
  const reset = (commands: any[] = []) => {
    const chunks = [{
      commands: [],
      lineNumber: undefined,
    }];
    while (commands.length) {
      const command = commands.shift();
      const { key, method, args } = command;
      if (key === null && method === 'delay') {
        const [lineNumber] = args;
        chunks[chunks.length - 1].lineNumber = lineNumber;
        chunks.push({
          commands: [],
          lineNumber: undefined,
        });
      } else {
        chunks[chunks.length - 1].commands.push(command);
      }
    }
    dispatch(setChunks(chunks));
    dispatch(setCursor(0));
    dispatch(setLineIndicator(undefined))
  };


  // 点击后保存代码
  function save() {
    // 用当前的key找他对应的realurl，随后发送给后端
    const temp = files.find((file) => file.name === activeKey)
    const realurl = temp ? temp.realurl : ''
    //存入数据库
    file.save({
      "filename": activeKey,
      "content": activeText,
      "realurl": realurl,
      "folderid": folder_id
    })
  }

  // 切换tab
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    const newActiveText = items.filter((item) => item.key === newActiveKey)[0].children.props.value
    if (newActiveText) setActiveText(newActiveText)
  };

  // 增加tab
  const add = () => {
    // tab key 删除的时候用
    const newActiveKey = `new${newTabIndex.current++}`;
    // tab pane 所有tab的数组
    // const test = cloneDeep(inittest);
    const newPanes: any = cloneDeep(items);
    newPanes.push({
      label: newActiveKey + '.js',
      children: Editor({ data: '', onChange: (e: any) => handleChange(e) }),
      key: newActiveKey,
      closable: false,
    });
    console.log(newPanes, newActiveKey)
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  // 删除tab
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        console.log(item)
        lastIndex = i - 1;
      }
    });

    const newPanes = items.filter((item) => item.key !== targetKey);

    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  // 监听tab变化，targetKey如果add是click event
  //                       如果remove是删除的tab key
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      centered={true}
      tabBarExtraContent={button}
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
      style={{ height: '100%', width: '100%' }}
      onTabClick={()=>{console.log('click '+activeKey)}}
    />
  )
}

export default Code
