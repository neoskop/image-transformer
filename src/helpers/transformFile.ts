import path from 'path';
import { ImageTransformerOpts } from '../types/config';
import { generateJpeg } from './generators/generateJpeg';
import { generatePng } from './generators/generatePng';
import generateSVG from './generators/generateSVG';
import { generateTracedSvg } from './generators/generateTracedSvg';
import { generateWebp } from './generators/generateWebp';

const transformFile = async (
  filePath: string,
  opts: Required<ImageTransformerOpts>
): Promise<void> => {
  const extension = path.extname(filePath);
  const targetFilepath = path
    .resolve(filePath)
    .replace(path.resolve(opts.source), path.resolve(opts.destination));

  const promises: Promise<void>[] = [];

  switch (extension) {
    case '.svg':
      // if file is svg, optimized svg
      promises.push(generateSVG({ filePath, targetFilepath, opts }));
      break;
    case '.png':
      // if file is png, generate webp + optimized png
      opts.sizes.forEach(size => {
        promises.push(generatePng({ filePath, targetFilepath, opts }, size));
        promises.push(generateWebp({ filePath, targetFilepath, opts }, size));
      });

      if (opts.traced.enabled) {
        promises.push(generateTracedSvg({ filePath, targetFilepath, opts }));
      }
      break;

    default:
      // for all other files: generate webp + optimized jpg
      opts.sizes.forEach(size => {
        promises.push(generateJpeg({ filePath, targetFilepath, opts }, size));
        promises.push(generateWebp({ filePath, targetFilepath, opts }, size));
      });

      if (opts.traced.enabled) {
        promises.push(generateTracedSvg({ filePath, targetFilepath, opts }));
      }

      break;
  }
  await Promise.all(promises);
};

export default transformFile;
