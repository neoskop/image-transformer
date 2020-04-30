import sharp from 'sharp';
import { Size } from '../../types/config';
import { changeExtension } from '../changeExtension';
import sharpToFile from '../sharpToFile';
import { GeneratorParams } from './interfaces';

export const generatePng = async (params: GeneratorParams, size: Size) => {
  const { filePath, targetFilepath, opts } = params;
  const pngFilepath = changeExtension(targetFilepath, `${size.suffix}.png`);

  const sharped = sharp(filePath)
    .resize(size.width, size.height, { withoutEnlargement: true })
    .png(opts.formats.png);

  await sharpToFile(sharped, pngFilepath);
};
