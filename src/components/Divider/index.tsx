import React from 'react';
import { classes } from '../../common/util';
import styles from './Divider.module.less';

class Divider extends React.Component {
  target: any;
  constructor(props:any) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(e:any) {
    this.target = e.target;
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e:any) {
    const { onResize } = this.props;
    if (onResize) onResize(this.target.parentElement, e.clientX, e.clientY);
  }

  handleMouseUp(e:any) {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { className, horizontal }:any = this.props;

    return (
      <div className={classes(styles.divider, horizontal ? styles.horizontal : styles.vertical, className)}
           onMouseDown={this.handleMouseDown} />
    );
  }
}

export default Divider;
