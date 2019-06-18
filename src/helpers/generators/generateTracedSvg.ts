import sharp from 'sharp';
import fs from 'fs';
import traceSVG from '../traceSVG';
import { changeExtension } from '../changeExtension';
import { GeneratorParams } from './interfaces';

export const generateTracedSvg = async (params: GeneratorParams) => {
  const { filePath, targetFilepath, opts } = params;
  const tracedSourcePngPath = changeExtension(targetFilepath, `png`);
  if (!fs.existsSync(tracedSourcePngPath)) {
    sharp(filePath)
      .resize(opts.traced.width)
      .png()
      .toFile(tracedSourcePngPath)
      .then(async () => {
        const traced = await traceSVG(tracedSourcePngPath, opts.traced.color);
        return fs.promises.writeFile(
          changeExtension(targetFilepath, `traced.svg`),
          traced.data
        );
      });
  }
};
