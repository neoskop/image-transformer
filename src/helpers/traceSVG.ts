import potrace from 'potrace';
import optimizeSvg from './optimizeSvg';
import bluebird from 'bluebird';
import { OptimizedSvg } from '../types/svg';

export const trace = bluebird.Promise.promisify(potrace.trace) as (
  ...args: any
) => Promise<string>;

const traceSVG = async (
  filePath: string,
  color: string
): Promise<OptimizedSvg> => {
  return trace(filePath, {
    color,
    optTolerance: 0.4,
    turdSize: 100,
    turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY
  }).then((svg: string) => optimizeSvg(svg));
};

export default traceSVG;
