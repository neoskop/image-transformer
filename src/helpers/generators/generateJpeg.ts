import fs from 'fs';
import sharp from 'sharp';
import { Size } from '../../types/config';
import { changeExtension } from '../changeExtension';
import { GeneratorParams } from './interfaces';

export const generateJpeg = async (params: GeneratorParams, size: Size) => {
  const { filePath, targetFilepath, opts } = params;
  const jpegFilePath = changeExtension(targetFilepath, `${size.suffix}.jpeg`);

  if (!fs.existsSync(jpegFilePath)) {
    sharp(filePath)
      .resize(size.width, size.height)
      .jpeg(opts.formats.jpg)
      .toFile(jpegFilePath);
  }
};
