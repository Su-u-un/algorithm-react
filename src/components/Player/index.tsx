import React, {  useState, useEffect } from 'react';
import { Slider, InputNumber ,Button,Radio,Col,Row  } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {useSelector,useDispatch} from 'react-redux'
import { setCursor } from '../../store/play';
import { setBuilding } from '../../store/current';

import styles from './Player.module.less';

// 定时器
let timer:number = 0

const Player: React.FC = () => {
  const [playing, setPlaying] = useState(false); // 播放中
  const {chunks,cursor} = useSelector((state: any) => state.player);
  const {files,building} = useSelector(state => state.current)
  const [progress, setProgress] = useState(1); // 进度
  
  const dispatch = useDispatch()

  // 监听building
  useEffect(()=>{
    if(building === true) setProgress(1)
    // 在building过后再置否，用于重新进行判断
    setTimeout(()=>{
      dispatch(setBuilding(false))
    })
  },[building])

  // 监听是否更换目录
  useEffect(()=>{
    setProgress(1)
  },[files])

  // 监听进度条变化，更新cursor
  useEffect(()=>{
    if(building !== true){
      dispatch(setCursor(progress))
    }
  },[progress])

  // 判断进度是否合法
  const isAble = (val:number)=>{
    return 1 <= val && val <= chunks.length
  }
  // 进度条前进后退
  const handleBtn = (e:any) => {
    const temp = progress+(e.target.value-0)
    setProgress(temp)
  }

  // 继续播放
  const next = (pre:number) => {
    if(isAble(++pre)) return pre++
    else {
      setPlaying(false);
      window.clearInterval(timer);
      return 1
    }
  }

  const onChange = (val:number) => {
    setProgress(val)
  }

  const play = () => {
    setPlaying(true);
    timer = window.setInterval(() => {
      setProgress(next);
    },100)
  };

  const pause = () => {
    setPlaying(false);
    if (timer) {
      window.clearInterval(timer);
    }
  };

  return (
    <div style={{marginLeft:'20px',width:'600px'}}>
      <Row>
        <Col span={4}>
          {
          playing ? 
            <Button onClick={pause}>pause</Button> 
          :
            <Button onClick={play}>play</Button>
          }
        </Col>
        <Col span={4}>
          <Radio.Group value={progress} onChange={handleBtn}>
            <Radio.Button value="-1" disabled={!isAble(cursor-1)}><LeftOutlined /></Radio.Button>
            <Radio.Button value="+1" disabled={!isAble(cursor+1)}><RightOutlined /></Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Slider style={{ marginTop: '25px' }} min={1} max={chunks.length?chunks.length:1} value={cursor} onChange={onChange}/>
        </Col>
        <Col span={8}>
          <InputNumber
            min={1}
            max={chunks.length}
            style={{ margin: '0 16px' }}
            value={progress}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );

}
  export default Player;