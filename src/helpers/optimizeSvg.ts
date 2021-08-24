import { optimize } from 'svgo';
import { OptimizedSvg } from '../types/svg';

const optimizeSvg = async (svg: string, args = {}): Promise<OptimizedSvg> => {
  return optimize(svg, args);
};

export default optimizeSvg;
