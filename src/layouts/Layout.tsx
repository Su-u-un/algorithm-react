import React from 'react';
import  ResizableContainer from '../components/ResizableContainer';
import { HorizontalLayout } from './index';

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
    const horizontal = this instanceof HorizontalLayout;

    return(
      <ResizableContainer key={this.key} ref={this.ref} weights={this.weights} horizontal={horizontal}
                          onChangeWeights={this.handleChangeWeights}>
        {
          this.children.map(tracer => tracer && tracer.render())
        }
      </ResizableContainer>
    )
    
  }
}

export default Layout;
