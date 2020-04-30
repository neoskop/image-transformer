import fs from 'fs';
import sharp from 'sharp';

const existsFileWithSharpData = async (
  filePath: string,
  sharpData: sharp.Sharp
): Promise<boolean> => {
  if (fs.existsSync(filePath)) {
    const sharpedBuffer = await sharpData.toBuffer();
    const existedFileBuffer = await fs.promises.readFile(filePath);
    return sharpedBuffer.equals(existedFileBuffer);
  }

  return false;
};

export default existsFileWithSharpData;
