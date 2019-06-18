import chalk from 'chalk';

const logger = (message: string): void => {
  console.log(
    `${chalk
      .bgRgb(62, 36, 71)
      .gray('[@neoskop/image-generator]')} ${chalk.white(message)}`
  );
};

export default logger;
