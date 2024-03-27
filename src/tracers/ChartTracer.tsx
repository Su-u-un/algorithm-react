import { Array1DTracer } from './index';
import { ChartRenderer } from '../renderers';

class ChartTracer extends Array1DTracer {
  getRendererClass() {
    return ChartRenderer;
  }
}

export default ChartTracer;
