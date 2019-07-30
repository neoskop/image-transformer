import { ImageTransformerOpts } from './types/config';
import async from 'async';
import getFilePaths from './helpers/getFilePaths';
import defaultOpts from './config/default';
import transformFile from './helpers/transformFile';
import logger from './logger';
import { mkdirp } from 'fs-extra';
import path from 'path';

const transform = async (opts: ImageTransformerOpts): Promise<void> => {
  const mergedOpts = Object.assign(defaultOpts, opts);

  const filePaths = await getFilePaths(mergedOpts.source);
  logger(`will transform ${filePaths.length} assets`);

  // create destination directories
  const promises = filePaths.map(async filePath => {
    const destinationDir = path
      .resolve(path.dirname(filePath))
      .replace(path.resolve(opts.source), path.resolve(opts.destination));

    await mkdirp(destinationDir);
  });

  await Promise.all(promises);

  return new Promise((resolve, reject) => {
    async.eachLimit(
      filePaths,
      5,
      (filePath, callback) => transformFile(filePath, callback, mergedOpts),
      err => {
        if (err) {
          reject(err);
        } else {
          logger(`successfully transformed all assets`);
          resolve();
        }
      }
    );
  });
};

export default transform;
