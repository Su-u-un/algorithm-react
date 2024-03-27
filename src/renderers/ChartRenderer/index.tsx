import React,{useState} from 'react';
import { Bar } from 'react-chartjs-2';
import ReactECharts from 'echarts-for-react';
import { Array1DRenderer } from '../index';
import styles from './ChartRenderer.module.less';

class ChartRenderer extends Array1DRenderer {
  renderData() {
    const { data: [row] } = this.props.data;
    const temp = {
      grid: { top: 8, right: 8, bottom: 24, left: 36 },
      xAxis: {
        type: 'category',
        data: row.map(col => `${col.value}`),
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: row.map(col => col.value),
          type: 'bar',
          smooth: true,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      animation: false
    }
    


    return (
      <ReactECharts
      option={temp} style={{ height: 400,width:500 }}
      opts={{ renderer: 'svg' }}
    />
    );
  }
}

export default ChartRenderer;

