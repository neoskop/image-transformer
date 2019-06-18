import glob from 'glob';
import path from 'path';

const getFilePaths = async (dirname: string): Promise<string[]> => {
  const filePaths = await new Promise<string[]>((resolve, reject) =>
    glob(
      path.join(dirname, '**', '*.@(png|jpg|jpeg|gif|svg|webp|tiff)'),
      {},
      (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      }
    )
  );
  return filePaths;
};

export default getFilePaths;
