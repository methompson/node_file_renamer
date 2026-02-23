import { rename } from 'node:fs/promises';
import { join } from 'node:path';

import { confirm } from '@inquirer/prompts';
import chalk from 'chalk';

import { FileOp } from '@/string_ops/file_op';
import { showFileListPreview } from '@/utils/file_preview';

export async function executeRename(
  directory: string,
  fileList: string[],
  operations: FileOp[],
) {
  // Preview changes
  console.log(chalk.blue('\n📋 Preview of changes:\n'));
  showFileListPreview(fileList, operations, false);

  // Confirm execution
  const shouldExecute = await confirm({
    message: 'Apply these operations to all files?',
    default: false,
  });

  if (!shouldExecute) {
    console.log(chalk.yellow('Operation cancelled.\n'));
    return;
  }

  // Execute operations
  console.log(chalk.blue('\n⚙️  Applying operations...\n'));

  const promises: Promise<unknown>[] = [];
  fileList.forEach((file, index) => {
    const result = FileOp.applyAllToFile(file, operations, index);
    if (file === result) {
      // No change, skip
      return;
    }

    const oldPath = join(directory, file);
    const newPath = join(directory, result);
    promises.push(rename(oldPath, newPath));
  });

  await Promise.all(promises);

  console.log(
    chalk.green(`\n✅ Successfully processed ${fileList.length} files!\n`),
  );
}
