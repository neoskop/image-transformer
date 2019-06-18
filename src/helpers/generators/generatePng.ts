import fs from 'fs';
import sharp from 'sharp';
import { Size } from '../../types/config';
import { changeExtension } from '../changeExtension';
import { GeneratorParams } from './interfaces';

export const generatePng = async (params: GeneratorParams, size: Size) => {
  const { filePath, targetFilepath, opts } = params;
  const pngFilepath = changeExtension(targetFilepath, `${size.suffix}.png`);

  if (!fs.existsSync(pngFilepath)) {
    sharp(filePath)
      .resize(size.width, size.height)
      .png(opts.formats.png)
      .toFile(pngFilepath);
  }
};
