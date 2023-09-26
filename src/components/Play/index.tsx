import React, {useState} from "react";
import {connect} from 'react-redux'
import { Col, InputNumber, Row, Slider} from 'antd';
import { actions } from '../../reducers';
import { useDispatch,useSelector } from "react-redux";

const Play: React.FC = () => {
    const [inputValue, setInputValue] = useState(1);

    const dispatch = useDispatch()

// 所以chunks是下面形式
const chunks = [
    [
      {
        method:'select',
        args:[0]
      }
    ],
    [
      {
        method:'patch',
        // args[0]是下标 args[1]是value
        args:[0,1]
      },
      {
        method:'patch',
        args:[1,3]
      },
    ],
    [
      {
        method:'depatch',
        // 下标
        args:[0]
      },
      {
        method:'depatch',
        args:[1]
      },
    ]
  ]
  // 接着把chunks生成一个进度条，通过进度条控制chart的展示情况。
// 进度条到多少，就执行对应进度条-1的下标的chunks  


    const onChange = (newValue: number) => {
      // 把chunks[newValue]传给chart，chart要对这个进行解析
      dispatch(actions.setChunks(chunks[newValue-1]))
      setInputValue(newValue);
    };
  
    return (
      <Row>
        <Col span={10}>
          <Slider
            min={1}
            max={3}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={6}>
          <InputNumber
            min={1}
            max={3}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    );
  };
  

  export default Play
  