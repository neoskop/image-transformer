import fs from 'fs';
import sharp from 'sharp';
import { changeExtension } from '../changeExtension';
import existsFileWithSharpData from '../existsFileWithSharpData';
import traceSVG from '../traceSVG';
import { GeneratorParams } from './interfaces';

export const generateTracedSvg = async (params: GeneratorParams) => {
  const { filePath, targetFilepath, opts } = params;
  const tracedSourcePngPath = changeExtension(targetFilepath, `png`);
  const sharped = sharp(filePath).resize(opts.traced.width).png();

  if (await existsFileWithSharpData(tracedSourcePngPath, sharped)) {
    return;
  }

  await sharped.toFile(tracedSourcePngPath);
  const { data } = await traceSVG(tracedSourcePngPath, opts.traced.color);
  await fs.promises.writeFile(
    changeExtension(targetFilepath, `traced.svg`),
    data
  );

  return Promise.resolve();
};
