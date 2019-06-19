import fs from 'fs';
import sharp from 'sharp';
import { Size } from '../../types/config';
import { changeExtension } from '../changeExtension';
import { GeneratorParams } from './interfaces';
import path from 'path';

export const generateJpeg = async (params: GeneratorParams, size: Size) => {
  const { filePath, targetFilepath, opts } = params;
  const extname = path.extname(filePath);

  const jpegFilePath = changeExtension(
    targetFilepath,
    `${size.suffix}${extname === '.jpg' ? '.jpg' : '.jpeg'}`
  );

  if (!fs.existsSync(jpegFilePath)) {
    sharp(filePath)
      .resize(size.width, size.height, { withoutEnlargement: true })
      .jpeg(opts.formats.jpg)
      .toFile(jpegFilePath);
  }
};
