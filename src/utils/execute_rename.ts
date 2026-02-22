import { FileOp } from '@/string_ops/file_op';
import { confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { rename } from 'fs/promises';
import { join } from 'path';
import { showFileListPreview } from './file_preview';

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

  for (let i = 0; i < fileList.length; i++) {
    const originalFile = fileList[i] || '';
    let newFileName: string = originalFile;

    // Apply each operation in sequence
    for (let opIndex = 0; opIndex < operations.length; opIndex++) {
      const op = operations[opIndex];
      if (op) {
        newFileName = op.apply(newFileName, i);
      }
    }

    // Only rename if the name changed
    if (originalFile !== newFileName) {
      const oldPath = join(directory, originalFile);
      const newPath = join(directory, newFileName);
      await rename(oldPath, newPath);
      console.log(chalk.green(`✓ ${originalFile} → ${newFileName}`));
    }
  }

  console.log(
    chalk.green(`\n✅ Successfully processed ${fileList.length} files!\n`),
  );
}
