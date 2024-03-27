import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import styles from './Code.module.less'
import {debounce,cloneDeep,merge} from 'lodash';
import { Tabs, Button } from 'antd';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useDispatch, useSelector } from "react-redux";
import {classes, extension} from '../../common/util';
import { TracerApi } from '../../apis';
import { setChunks, setCursor, setLineIndicator } from "../../store/play";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const Code: React.FC = () => {
  // 编辑器
  const Editor: React.FC = (data) => {
    // 防抖输入
    // const debouncedSave = useCallback(
    //   debounce(nextValue => setActiveText(nextValue), 3000),
    //   [], 
    // );
    // 变化就更新活动文本
    const handleChange = data => setActiveText(data)
    
  
    return (<CodeMirror
            value={data}
            onChange={handleChange}
            extensions={[javascript({ jsx: true })]}
          />)
  }

  useLayoutEffect(() => {
    // getFile()
    build()
  },[])

  /**这里接受file，并且可以批量生成对应tab */
  const temp1 = "// import visualization libraries {\r\nconst { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('../utils/trans');\r\n// }\r\n\r\n// define tracer variables {\r\nconst chart = new ChartTracer();\r\nconst tracer = new Array1DTracer();\r\nconst logger = new LogTracer();\r\nLayout.setRoot(new VerticalLayout([chart, tracer, logger]));\r\nconst D = Randomize.Array1D({ N: 15 });\r\ntracer.set(D);\r\ntracer.chart(chart);\r\nTracer.delay();\r\n// }\r\n\r\n// logger {\r\nlogger.println(`original array = [${D.join(', ')}]`);\r\n// }\r\nconst N = D.length;\r\nlet swapped;\r\nlet gap = N; // initialize gap size\r\nconst shrink = 1.3; // set the gap shrink factor\r\n\r\ndo {\r\n    // update the gap value for the next comb.\r\n    gap = Math.floor(gap / shrink);\r\n    if (gap < 1) {\r\n        // minimum gap is 1\r\n        gap = 1;\r\n    }\r\n\r\n    swapped = false; // initialize swapped\r\n    // a single comb over the input list\r\n    for (let i = 0; i + gap < N; i++) {\r\n        // visualize {\r\n        tracer.select(i);\r\n        tracer.select(i + gap);\r\n        Tracer.delay();\r\n        // }\r\n\r\n        if (D[i] > D[i + gap]) {\r\n            // logger {\r\n            logger.println(`swap ${D[i]} and ${D[i + gap]}`); // log swap event\r\n            // }\r\n\r\n            const temp = D[i];\r\n            D[i] = D[i + gap];\r\n            D[i + gap] = temp;\r\n\r\n            // visualize {\r\n            tracer.patch(i, D[i]);\r\n            tracer.patch(i + gap, D[i + gap]);\r\n            Tracer.delay();\r\n            tracer.depatch(i);\r\n            tracer.depatch(i + gap);\r\n            // }\r\n\r\n            swapped = true; // Flag swapped has happened and list is not guaranteed sorted\r\n        }\r\n        // visualize {\r\n        tracer.deselect(i);\r\n        tracer.deselect(i + gap);\r\n        // }\r\n    } // End of combing\r\n} while (gap !== 1 || swapped);\r\n"
  const inittest = useRef((code)=>{
    return Editor(code)
  })
  const initialItems = [
    { label: 'Tab 1', children: Editor(temp1), key: '1', closable: false, },
    { label: 'Tab 2', children: Editor('sss'), key: '2', closable: false, },
  ];
  const file = [{name:'',content:'',key:''}]
  const [init, setInit] = useState([]);
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const [activeText,setActiveText] = useState(initialItems[0].children.props.value)
  const [building, setBuilding] = useState(false);

  const cursor = useSelector((state: any) => state.player.cursor);

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
      const response = await axios.post('http://localhost:3000/file/build',{
        'foldername':"comb-sort",
        'username':"www",
        'filename':"code.js"
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
      console.log(typeof commands)
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

  const getFile = async ()=>{
    try {
      const response = await axios.get('http://localhost:3000/file/readfile',{params:{
        "foldername":"comb-sort",
        "username":"www"
      }});
      let temp = []
      for(let i=0;i<response.data.length;i++){
    console.log(response.data)

        add(response.data[i].filename,response.data[i].content)
      }
      // setInit(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  // 点击后保存代码
  function save() {
    // 更新items
    // 得到active的tab，把content放进这个key下的props.value
    const newPanes = cloneDeep(items)
    const temp = newPanes.map(item=>{
      if (item.key === activeKey) {
        return {
          ...item,
          children:Object.assign(item.children,{props:Object.assign(item.children.props,{value:activeText})})
        }
      }
    return item;
    })
    
    // setItems(temp)
    // 存入数据库，保存props.value（待做
    axios.post('http://localhost:3000/file/update',{
        "foldername":"comb-sort",
        "username":"www",
        "filename":"code.js",
        "content":activeText
      });
  }

  // 切换tab
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    const newActiveText = items.filter((item) => item.key === newActiveKey)[0].children.props.value
    if(newActiveText) setActiveText(newActiveText)
  };

  // 增加tab
  const add = (filename='.js',content='') => {
    console.log('2')
    // tab key 删除的时候用
    const newActiveKey = `new${newTabIndex.current++}`;
    // tab pane 所有tab的数组
    // const test = cloneDeep(inittest);
    const newPanes = cloneDeep(items);
    newPanes.push({ label: newActiveKey+filename,children: inittest.current(content), key: newActiveKey });
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
