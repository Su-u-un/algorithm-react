import React, { useEffect, useState, useRef,useLayoutEffect } from 'react';
import * as TracerClasses from '../../tracers';
import * as LayoutClasses from '../../layouts';
import { useSelector,useDispatch } from 'react-redux';
import { setBuilding } from '../../store/current';


const Charts = () => {
    const [val, setVal] = useState(null)
    let objects = {}
    const {chunks,cursor} = useSelector((state: any) => state.player);
    const {building} = useSelector(state => state.current)

    const dispatch = useDispatch()

    useEffect(() => {
        update(chunks, cursor);
        // 接受新的state
      }, [cursor]);

    //   useEffect(() => {
    //     if( building === true ) update(chunks, cursor);
    //     return () => {
    //         dispatch(setBuilding(false))
    //     }
    //   },[building])

    const reset = ()=>{
        setVal(null)
        objects = {}
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
      }

    function applyChunk(chunk: any) {
        chunk.commands.forEach((e: any) => applyCommands(e));
    }
    function applyCommands(command) {
        const { key, method, args } = command;
        try {
            if (key === null && method === 'setRoot') {
                const [temp] = args;
                setVal(objects[temp])
            }
            else if (method === 'destroy') {
                delete objects[key];
            } else if (method in LayoutClasses) {
                const [children] = args;
                const LayoutClass = LayoutClasses[method];
                objects[key] = new LayoutClass(key, (key: string) => objects[key], children);
            } else if (method in TracerClasses) {
                const className = method;
                const [title = className] = args;
                const TracerClass = TracerClasses[className];
                objects[key] = new TracerClass(key, (key: string) => objects[key], title);
            } else {
                objects[key][method](...args);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div style={{height:'100%'}}>
            {val && val.render()}
        </div>
    )

}

export default Charts