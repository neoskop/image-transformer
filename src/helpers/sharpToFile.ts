import sharp from 'sharp';
import existsFileWithSharpData from './existsFileWithSharpData';

const sharpToFile = async (sharpData: sharp.Sharp, filePath: string) => {
  if (await existsFileWithSharpData(filePath, sharpData)) {
    return;
  }

  await sharpData.toFile(filePath);
};

export default sharpToFile;
