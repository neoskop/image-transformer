import SVGO from 'svgo';
import { OptimizedSvg } from '../types/svg';

const svgo = new SVGO({ floatPrecision: 0 });

const optimizeSvg = async (svg: string, args = {}): Promise<OptimizedSvg> => {
  return svgo.optimize(svg, args);
};

export default optimizeSvg;
