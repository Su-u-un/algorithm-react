import React, { useRef, useState } from "react";
import styles from './Code.module.less'
import { Tabs ,Button} from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';


type TargetKey = React.MouseEvent | React.KeyboardEvent | string;


// 这个位置通过获取后端传来的代码，然后生成代码编辑器组件，放到children里面

const button = {left:<Button>Build</Button>,right:<Button>Save</Button>}


const tab2:React.FC=(data)=>(
    <CodeMirror
      value={data}
      extensions={[javascript({ jsx: true })]}
    />
)

const temp1 = "// import visualization libraries {\nconst { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');\n// }\n\n// define tracer variables {\nconst chart = new ChartTracer();\nconst tracer = new Array1DTracer();\nconst logger = new LogTracer();\nLayout.setRoot(new VerticalLayout([chart, tracer, logger]));\nconst D = Randomize.Array1D({ N: 15 });\ntracer.set(D);\ntracer.chart(chart);\nTracer.delay();\n// }\n\n// logger {\nlogger.println(`original array = [${D.join(', ')}]`);\n// }\nconst N = D.length;\nlet swapped;\nlet gap = N; // initialize gap size\nconst shrink = 1.3; // set the gap shrink factor\n\ndo {\n  // update the gap value for the next comb.\n  gap = Math.floor(gap / shrink);\n  if (gap < 1) {\n    // minimum gap is 1\n    gap = 1;\n  }\n\n  swapped = false; // initialize swapped\n  // a single comb over the input list\n  for (let i = 0; i + gap < N; i++) {\n    // visualize {\n    tracer.select(i);\n    tracer.select(i + gap);\n    Tracer.delay();\n    // }\n\n    if (D[i] > D[i + gap]) {\n      // logger {\n      logger.println(`swap ${D[i]} and ${D[i + gap]}`); // log swap event\n      // }\n      \n      const temp = D[i];\n      D[i] = D[i + gap];\n      D[i + gap] = temp;\n\n      // visualize {\n      tracer.patch(i, D[i]);\n      tracer.patch(i + gap, D[i + gap]);\n      Tracer.delay();\n      tracer.depatch(i);\n      tracer.depatch(i + gap);\n      // }\n\n      swapped = true; // Flag swapped has happened and list is not guaranteed sorted\n    }\n    // visualize {\n    tracer.deselect(i);\n    tracer.deselect(i + gap);\n    // }\n  } // End of combing\n} while (gap !== 1 || swapped);\n"

const initialItems = [
    { label: 'Tab 1', children: tab2(temp1), key: '1' ,closable: false,},
    { label: 'Tab 2', children: tab2('sss'), key: '2' ,closable: false,},
    {
    label: 'Tab 3',
    children: tab2('wzzz'),
    key: '3',
    closable: false,
    },
];

const Code:React.FC=()=>{
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

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

    return(
        <Tabs
            tabBarExtraContent={button}
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
            style={{height:'100%',width:400}}
        >
    </Tabs>
    )
}

export default Code
