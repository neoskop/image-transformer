import path from 'path';

export const changeExtension = (
  filePath: string,
  newExtension: string
): string => {
  const oldExtension = path.extname(filePath);
  return filePath.replace(new RegExp(`${oldExtension}$`), `.${newExtension}`);
};
