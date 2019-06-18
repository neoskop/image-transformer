import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ImageTransformerOpts } from '../types/config';
import { changeExtension } from './changeExtension';
import { generateTracedSvg } from './generators/generateTracedSvg';
import optimizeSvg from './optimizeSvg';
import { generatePng } from './generators/generatePng';
import { generateWebp } from './generators/generateWebp';
import { generateJpeg } from './generators/generateJpeg';

const transformFile = async (
  filePath: string,
  callback: any,
  opts: Required<ImageTransformerOpts>
): Promise<void> => {
  const extension = path.extname(filePath);
  const targetFilepath = path
    .resolve(filePath)
    .replace(path.resolve(opts.source), path.resolve(opts.destination));

  const promises: Promise<any>[] = [];

  switch (extension) {
    case '.svg':
      // if file is svg, only optimize the svg file and then quit
      const file = await fs.promises.readFile(filePath, 'utf-8');

      const svgFilepath = changeExtension(targetFilepath, `svg`);

      if (!fs.existsSync(svgFilepath)) {
        const optimizedSvg = await optimizeSvg(file);
        await fs.promises.writeFile(svgFilepath, optimizedSvg.data);
      }
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
  callback();
};

export default transformFile;
