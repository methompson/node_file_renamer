import chalk from 'chalk';
import { FileOp } from '@/string_ops/file_op';

export function showFileListPreview(
  files: string[],
  ops: FileOp[],
  shortPreview = true,
) {
  console.log(chalk.cyan(`Found ${files.length} files to process.\n`));

  const filesToShow = shortPreview ? files.slice(0, 5) : files;

  const longestFile = filesToShow.reduce((longest, file) => {
    return file.length > longest.length ? file : longest;
  }, '');

  let index = 0;
  const previewLines = filesToShow.map((file) => {
    const transformed = ops.reduce((name, op) => op.apply(name, index), file);
    index++;

    return `${chalk.dim(file.padEnd(longestFile.length))} → ${chalk.green(
      transformed,
    )}`;
  });

  console.log(chalk.blue('Files'));
  console.log(previewLines.join('\n'));
}
