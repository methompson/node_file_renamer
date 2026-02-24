import chalk from 'chalk';
import { FileOp } from '@/string_ops/file_op';

export function showFileListPreview(
  files: string[],
  ops: FileOp[],
  shortPreview = true,
) {
  console.log(chalk.cyan(`Found ${files.length} files to process.\n`));

  const filesToShow = shortPreview ? files.slice(0, 5) : files;

  const longestFile = findLongestFileLength(filesToShow);

  let index = 0;
  const previewLines = filesToShow.map((file) => {
    const transformed = FileOp.applyAllToFile(file, ops, index);
    index++;

    return fileListPreviewLine(file, transformed, longestFile);
  });

  console.log(chalk.blue('Files'));
  console.log(previewLines.join('\n'));
}

export function findLongestFileLength(files: string[]): number {
  return files.reduce((longest, file) => {
    return file.length > longest.length ? file : longest;
  }, '').length;
}

export function fileListPreviewLine(
  oldName: string,
  newName: string,
  longestFileLength: number,
): string {
  return `${chalk.dim(oldName.padEnd(longestFileLength))} → ${chalk.green(
    newName,
  )}`;
}
