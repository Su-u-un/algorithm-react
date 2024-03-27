import React ,{useEffect,useRef} from 'react';
import styles from './Charts.module.less'
import { useSelector, useDispatch } from 'react-redux';
import { setChunks, setCursor, setLineIndicator } from '../../store/play';
import * as TracerClasses from '../../tracers';
import * as LayoutClasses from '../../layouts';
import Testt from './testt';

/**类型 */
import type { RootState, AppDispatch } from '../../store'
import type {Commend,State} from './index.type'

const Charts: React.FC = () => {
  let root:any = null;
  let ttt = null
  let objects:any = {};
  let player = useSelector((state:RootState)=>state.player)
  let prevState = useRef<State>()
  // 初始化
  useEffect(() => {
    const {chunks,cursor}:any = player
    update(chunks, cursor);
  }, []);

  // 根据state更新
  useEffect(() => {
    if(prevState.current){
      const {chunks,cursor}  = player
      const { chunks: oldChunks, cursor: oldCursor }: any = prevState;
      if (chunks !== oldChunks || cursor !== oldCursor) {
        update(chunks, cursor, oldChunks, oldCursor);
      }
      console.log(root)
    }
    // 接受新的state
    prevState.current = player
  }, [prevState.current]);

  const dispatch = useDispatch();


  const reset = ()=>{
    root = null;
    objects = {};
  }

  const update = (chunks:Array<any>, cursor:number, oldChunks:Array<any> = [], oldCursor:number = 0)=>{
    let applyingChunks;
    if (cursor > oldCursor) {
      applyingChunks = chunks.slice(oldCursor, cursor);
    } else {
      reset();
      applyingChunks = chunks.slice(0, cursor);
    }
    applyingChunks.forEach(chunk => applyChunk(chunk));

    const lastChunk:any = applyingChunks[applyingChunks.length - 1];
    if (lastChunk && lastChunk.lineNumber !== undefined) {
      dispatch(setLineIndicator({ lineNumber: lastChunk.lineNumber, cursor }));
    } else {
      dispatch(setLineIndicator(undefined));
    }
  }

  const applyCommands = (command:Commend)=>{
    const { key, method, args } = command;
    try {
      if (key === null && method === 'setRoot') {
        const [temp] = args;
        root = objects[temp];
        ttt = new Testt('dada')
      } else if (method === 'destroy') {
        delete objects[key];
      } else if (method in LayoutClasses) {
        const [children] = args;
        const LayoutClass = LayoutClasses[method];
        objects[key] = new LayoutClass(key, (key:string) => objects[key], children);
      } else if (method in TracerClasses) {
        const className = method;
        const [title = className] = args;
        const TracerClass = TracerClasses[className];
        objects[key] = new TracerClass(key, (key:string) => objects[key], title);
      } else {
        objects[key][method](...args);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const applyChunk = (chunk:any)=>{
    chunk.commands.forEach((e:any) => applyCommands(e));
  }


  return (
      <div  style={{ width: '100%', height: '100%' }}>
        {ttt.render()}
      </div>
  );
}

export default Charts