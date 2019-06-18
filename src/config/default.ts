import { ImageTransformerOpts } from '../types/config';

const defaultOpts: Required<ImageTransformerOpts> = {
  source: './assets',
  destination: './destination',
  sizes: [{ width: 100, suffix: 'tiny' }],
  traced: { enabled: true, color: 'lightgray', width: 350 },
  formats: {
    png: {
      quality: 50
    },
    webp: {
      quality: 50
    },
    svg: {
      quality: 50
    },
    jpg: {
      quality: 50
    }
  }
};
export default defaultOpts;
