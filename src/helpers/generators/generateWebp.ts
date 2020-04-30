import sharp from 'sharp';
import { Size } from '../../types/config';
import { changeExtension } from '../changeExtension';
import sharpToFile from '../sharpToFile';
import { GeneratorParams } from './interfaces';

export const generateWebp = async (params: GeneratorParams, size: Size) => {
  const { filePath, targetFilepath, opts } = params;
  const webpFilePath = changeExtension(targetFilepath, `${size.suffix}.webp`);

  const sharped = sharp(filePath)
    .resize(size.width, size.height, { withoutEnlargement: true })
    .webp(opts.formats.webp);

  await sharpToFile(sharped, webpFilePath);
};
