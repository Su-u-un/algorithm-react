// 导入并重命名,actions是所有事件的对象
import { actions as playerActions } from './player';


export { default as player } from './player';


// 把所有的事件放入
export const actions = {
  ...playerActions,
};