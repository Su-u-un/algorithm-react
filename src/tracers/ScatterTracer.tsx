import { Array2DTracer } from './index';
import { ScatterRenderer } from '../renderers';

class ScatterTracer extends Array2DTracer {
  getRendererClass() {
    return ScatterRenderer;
  }
}

export default ScatterTracer;
