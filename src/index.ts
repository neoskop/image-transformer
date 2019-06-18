import { ImageTransformerOpts } from './types/config';
import async from 'async';
import getFilePaths from './helpers/getFilePaths';
import defaultOpts from './config/default';
import transformFile from './helpers/transformFile';
import logger from './logger';
import mkdirp from 'mkdirp-promise';
import path from 'path';

const transform = async (opts: ImageTransformerOpts): Promise<void> => {
  const mergedOpts = Object.assign(defaultOpts, opts);

  const filePaths = await getFilePaths(mergedOpts.source);
  logger(`will transform ${filePaths.length} assets`);

  // create destination dir
  const destinationDir = path
    .resolve(path.dirname(filePaths[0]))
    .replace(path.resolve(opts.source), path.resolve(opts.destination));

  await mkdirp(destinationDir);

  async.eachLimit(
    filePaths,
    5,
    (filePath, callback) => transformFile(filePath, callback, mergedOpts),
    err => console.log(err)
  );
};

export default transform;
