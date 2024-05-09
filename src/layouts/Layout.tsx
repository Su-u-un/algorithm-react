import React from 'react';
import {SplitPane,Pane} from 'react-split-pane';
import styles from './Layouts.module.less'

class Layout {
  key: string;
  getObject: (key: string) => any;
  children: any[];
  weights: number[];
  ref: React.RefObject<unknown>;
  constructor(key: string, getObject: (key: string) => any, children: string[]) {
    this.key = key;
    this.getObject = getObject;
    this.children = children.map(key => this.getObject(key));
    this.weights = children.map(() => 1);
    this.ref = React.createRef();

    this.handleChangeWeights = this.handleChangeWeights.bind(this);
  }

  add(key: string, index = this.children.length) {
    const child = this.getObject(key);
    this.children.splice(index, 0, child);
    this.weights.splice(index, 0, 1);
  }

  remove(key: string) {
    const child = this.getObject(key);
    const index = this.children.indexOf(child);
    if (~index) {
      this.children.splice(index, 1);
      this.weights.splice(index, 1);
    }
  }

  removeAll() {
    this.children = [];
    this.weights = [];
  }

  handleChangeWeights(weights:any) {
    this.weights.splice(0, this.weights.length, ...weights);
    (this.ref.current as any).forceUpdate();
  }

  render() {
    return(
      <SplitPane split='horizontal' >
        {this.children.map(tracer => {
          const size = 100/this.children.length + '%'
          return <Pane className={styles.pane} initialSize={size}>{tracer && tracer.render()}</Pane>
          }
        )}
      </SplitPane>
          
    )
    
  }
}

export default Layout;
