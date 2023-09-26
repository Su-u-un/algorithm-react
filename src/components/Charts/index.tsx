import React, { useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './Charts.module.less'
import { Button } from 'antd';
import { useSelector } from 'react-redux';


const Charts: React.FC = () => {
const newState =  useSelector(state=>state)


  const charts = useRef(null)

  const [options, setOptions] = useState(
    {
      grid: { top: 8, right: 8, bottom: 24, left: 36 },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [{value:820}, {value:932}, {value:901}, {value:934}, {value:1290}, {value:1330}, {value:1320}],
          type: 'bar',
          smooth: true,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      animation: false
    }
  )
// 这个组件会得到一堆命令组成的命令集，然后依次去解析命令然后delay对应的操作，
// 例如现在有一串命令：高亮1元素，0和1进行交换
// 第二串命令：取消交换的patch样式，高亮2元素
const commands = [
  // 第一个命令集，包含命令：高亮[0]
  {
    method:'delay',
    args:[]
  },
  {
    method:'select',
    args:[0]
  },
  // 第二个命令集，包含命令：更新[0],[1]
  {
    method:'delay',
    args:[]
  },
  {
    method:'patch',
    // args[0]是下标 args[1]是value
    args:[0,1]
  },
  {
    method:'patch',
    args:[1,3]
  },
  // 第三个命令集，包含命令：取消[0],[1]高亮
  {
    method:'delay',
    args:[]
  },
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

  function select(){
    // 获得原来的数据
    const newData:any = options.series[0].data
    // 对拷贝的数据的指定项进行高亮色处理
    newData[1] = {
      value:newData[1].value,
      itemStyle: {
        color: '#a90000'
      }
    }
    // 将拷贝的数据进行状态更新
    setOptions(e => ({
      ...e,
      series: [{
        ...e.series[0],
        newData
      }]
    }))
    charts.current.getEchartsInstance().setOption(options)
  }
  function deselect(){

  }
  function patch(){
    // 获得原来的数据
    const newData:any = options.series[0].data
    // 保存一个交换数据
    const temp = newData[0]
    // 进行交换
    newData[0] = newData[1]
    newData[1] = temp
    newData[1] = {
      value:newData[1].value,
      itemStyle: {
        color: '#f6c433'
      }
    }
    newData[0] = {
      value:newData[0].value,
      itemStyle: {
        color: '#f6c433'
      }
    }
    // 将拷贝的数据进行状态更新
    setOptions(e => ({
      ...e,
      series: [{
        ...e.series[0],
        newData
      }]
    }))
    console.log(newState);
    
    charts.current.getEchartsInstance().setOption(options)
  }
  function depatch(){

  }
  function delay(){

  }


  return (
    <div className={styles.container}>
      <Button onClick={select}>选中</Button>
      <Button onClick={deselect}>取消选中</Button>
      <Button onClick={patch}>patch</Button>
      <Button onClick={depatch}>depatch</Button>
      <Button onClick={delay}>delay</Button>
      {/* <div>{JSON.parse(newState.player[0])}</div> */}
      <ReactECharts ref={charts} option={options} notMerge={false}
        lazyUpdate={true} />
    </div>
  )
};

export default Charts;