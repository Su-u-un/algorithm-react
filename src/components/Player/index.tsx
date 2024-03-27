import React, {  useState, useRef } from 'react';
import { Slider, InputNumber ,Button,Radio,Col,Row  } from 'antd';
import {useSelector,useDispatch} from 'react-redux'
import { setCursor } from '../../store/play';

import styles from './Player.module.less';



const Player: React.FC = () => {
  const [speed, setSpeed] = useState(2);
  const [playing, setPlaying] = useState(false);
  const {chunks,cursor} = useSelector((state: any) => state.player);
  const [timer, setTimer] = useState();

  

  const dispatch = useDispatch()
  const prevState = useRef()

  // 判断cursor是否合法
  const isAble = (val:number)=>{
    return 1 <= val && val <= chunks.length
  }

  const handleBtn = (e) => {
    // pause()
    const temp = cursor+(e.target.value-0)
    dispatch(setCursor(temp))
  }

  const next = () => {
    // pause();
    console.log(cursor)
    const temp = cursor + 1;
    if (!isAble(cursor)) return false;
    dispatch(setCursor(temp))
    return true;
  }

  const onChange = (val) => {
    dispatch(setCursor(val));
  }

  const play = (wrap = false) => {
    pause();
    // 判断到头否，到头就置1重来，否则走下去
    if (next() || (wrap && dispatch(setCursor(1)))) {
      // 调整播放速率
      const interval = 4000 / Math.pow(Math.E, speed);
      setTimer(setTimeout(() => play(), interval))
      setPlaying(true);
    }
  };

  const pause = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(undefined);
      setPlaying(false);
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
            <Button onClick={()=>play(true)}>play</Button>
          }
        </Col>
        <Col span={4}>
          <Radio.Group value={cursor} onChange={handleBtn}>
            <Radio.Button value="-1" disabled={!isAble(cursor-1)}>&lt;</Radio.Button>
            <Radio.Button value="+1" disabled={!isAble(cursor+1)}>&gt;</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Slider min={1} max={chunks.length} value={cursor} onChange={onChange}/>
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