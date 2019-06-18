import fs from 'fs';
import sharp from 'sharp';
import { Size } from '../../types/config';
import { changeExtension } from '../changeExtension';
import { GeneratorParams } from './interfaces';

export const generateWebp = async (params: GeneratorParams, size: Size) => {
  const { filePath, targetFilepath, opts } = params;
  const webpFilePath = changeExtension(targetFilepath, `${size.suffix}.webp`);

  if (!fs.existsSync(webpFilePath)) {
    sharp(filePath)
      .resize(size.width, size.height)
      .webp(opts.formats.webp)
      .toFile(webpFilePath);
  }
};
