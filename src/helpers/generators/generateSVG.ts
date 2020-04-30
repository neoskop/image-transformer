import fs from 'fs';
import { changeExtension } from '../changeExtension';
import optimizeSvg from '../optimizeSvg';
import { GeneratorParams } from './interfaces';

const generateSVG = async ({ filePath, targetFilepath }: GeneratorParams) => {
  // if file is svg, only optimize the svg file and then quit
  const file = await fs.promises.readFile(filePath, 'utf-8');
  const svgFilepath = changeExtension(targetFilepath, `svg`);
  const optimizedSvg = await optimizeSvg(file);

  if (fs.existsSync(svgFilepath)) {
    const existedFile = await fs.promises.readFile(svgFilepath, 'utf-8');

    if (existedFile === optimizedSvg.data) {
      return;
    }
  }

  await fs.promises.writeFile(svgFilepath, optimizedSvg.data);
};

export default generateSVG;
