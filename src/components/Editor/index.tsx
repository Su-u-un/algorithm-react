import { Tabs } from 'antd';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const Editor: React.FC = (props:any) => {
    const {data,onChange} = props

    return (
        <CodeMirror
          basicSetup={{
              crosshairCursor: false
          }}
          value={data}
          onChange={(e)=>{onChange?.(e)}}
          extensions={[javascript({ jsx: true })]}
          height='calc(100vh - 144px)'
        />
    
    )
  }


export default Editor

