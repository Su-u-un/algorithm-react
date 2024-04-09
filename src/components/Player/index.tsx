import React, {  useState, useRef, useEffect } from 'react';
import { Slider, InputNumber ,Button,Radio,Col,Row  } from 'antd';
import {useSelector,useDispatch} from 'react-redux'
import { setCursor } from '../../store/play';

import styles from './Player.module.less';

let timer = null

const Player: React.FC = () => {
  const [speed, setSpeed] = useState(2);
  const [playing, setPlaying] = useState(false);
  const {chunks,cursor} = useSelector((state: any) => state.player);

  const [progress, setProgress] = useState(0)//进度
  const [isPlay, setIsPlay] = useState(false)//是否播放

useEffect(()=>{
  dispatch(setCursor(progress))
},[progress])

  const dispatch = useDispatch()

  // 判断cursor是否合法
  const isAble = (val:number)=>{
    return 1 <= val && val <= chunks.length
  }
  // 进度条前进后退
  const handleBtn = (e) => {
    // pause()
    const temp = cursor+(e.target.value-0)
    setProgress(temp)
  }

  const next = (pre) => {
    if(isAble(++pre)) return ++pre
    else {
    setPlaying(false);
      window.clearInterval(timer);
      return 1
    }
  }

  const onChange = (val) => {
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
    <div>
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
          <Radio.Group value={cursor} onChange={handleBtn}>
            <Radio.Button value="-1" disabled={!isAble(cursor-1)}>&lt;</Radio.Button>
            <Radio.Button value="+1" disabled={!isAble(cursor+1)}>&gt;</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Slider min={1} max={chunks.length?chunks.length:1} value={cursor} onChange={onChange}/>
        </Col>
        <Col span={8}>
          <InputNumber
            min={1}
            max={chunks.length}
            style={{ margin: '0 16px' }}
            value={cursor}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );

}
  export default Player;