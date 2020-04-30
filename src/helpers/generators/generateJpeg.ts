import path from 'path';
import sharp from 'sharp';
import { Size } from '../../types/config';
import { changeExtension } from '../changeExtension';
import sharpToFile from '../sharpToFile';
import { GeneratorParams } from './interfaces';

export const generateJpeg = async (params: GeneratorParams, size: Size) => {
  const { filePath, targetFilepath, opts } = params;
  const extname = path.extname(filePath);

  const jpegFilePath = changeExtension(
    targetFilepath,
    `${size.suffix}${extname === '.jpg' ? '.jpg' : '.jpeg'}`
  );

  const sharped = sharp(filePath)
    .resize(size.width, size.height, { withoutEnlargement: true })
    .jpeg(opts.formats.jpg);

  await sharpToFile(sharped, jpegFilePath);
};
