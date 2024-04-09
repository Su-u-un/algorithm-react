import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import styles from './Code.module.less'
import {debounce,cloneDeep,merge} from 'lodash';
import { Tabs, Button } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setChunks, setCursor, setLineIndicator } from "../../store/play";
import Editor from "../Editor";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const Code: React.FC = () => {
  const {files,folder_id} = useSelector(state => state.current)
    
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState([]);
  const [activeText,setActiveText] = useState('')
  const [building, setBuilding] = useState(false);

  useEffect(() => {
    if(files.length){
      const initialItems = files.map((file:any)=>{
        return{
          label:file.name,
          children:Editor({data:file.content,onChange:(e:any)=>handleChange(e)}),
          key:file.name,
          closable:false
        }
      })
      setActiveKey(initialItems[0].key)
      setItems(initialItems)
      setActiveText(initialItems[0].children.props.value)
    }
  },[files])

  useEffect(() => {
    if(items.length) build()
  },[items])

  const handleChange = data => setActiveText(data)

  const newTabIndex = useRef(0);

  const button = { left: <Button onClick={build}>Build</Button>, right: <Button onClick={save}>Save</Button> }

  const dispatch = useDispatch()


  // 点击后把代码发送到服务器，接收返回的命令集
  async function build(){
    // 保存当前
    save()
    // 重置chart
    reset();
    try {
    const realurl = files.find((file) => file.name === activeKey).realurl

      const response = await axios.post('http://localhost:3000/file/build',{
        'url':realurl
      });
      // setInit()
      setBuilding(true);
        const commands = response.data.data
          setBuilding(false);
          reset(commands);
          dispatch(setCursor(1))
    } catch (error) {
      console.error(error);
    }
  };

  // 重置palyer参数
  const reset = (commands:any[] = []) => {
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
    const realurl = temp?temp.realurl:''
    //存入数据库
    if(realurl){
      axios.post('http://localhost:3000/file/save',{
          "filename":activeKey,
          "content":activeText,
          "realurl":realurl
        });
    }
    else{
      axios.post('http://localhost:3000/file/save',{
          "filename":activeKey,
          "content":activeText,
          "folderid":folder_id
        });
    }
  }

  // 切换tab
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    const newActiveText = items.filter((item) => item.key === newActiveKey)[0].children.props.value
    if(newActiveText) setActiveText(newActiveText)
  };

  // 增加tab
  const add = () => {
    // tab key 删除的时候用
    const newActiveKey = `new${newTabIndex.current++}`;
    // tab pane 所有tab的数组
    // const test = cloneDeep(inittest);
    const newPanes:any = cloneDeep(items);
    newPanes.push({ 
      label: newActiveKey+'.js',
      children:Editor({data:'',onChange:(e:any)=>handleChange(e)}),
      key: newActiveKey 
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  // 删除tab
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
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
      tabBarExtraContent={button}
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
      style={{ height: '100%', width: '100%' }}
    >
    </Tabs>
  )
}

export default Code
