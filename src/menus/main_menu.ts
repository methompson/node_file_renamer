import { resolve } from 'node:path';

import { select } from '@inquirer/prompts';
import chalk from 'chalk';

import { FileOp } from '@/string_ops/file_op';

import { getFileList } from '@/utils/get_files';
import { executeRename } from '@/utils/execute_rename';
import { showFileListPreview } from '@/utils/file_preview';
import {
  configureLowercaseOp,
  configureSentenceCaseOp,
  configureTitleCaseOp,
  configureUppercaseOp,
} from '@/menus/case_menus';
import {
  configureTrimBetweenOp,
  configureTrimEndOp,
  configureTrimStartOp,
} from '@/menus/trim_menus';
import {
  configureInsertEndOp,
  configureInsertStartOp,
} from '@/menus/insert_menus';
import { configureReplaceOp } from './replace_menu';
import { configureCounterOp } from './counter_menu';

// TODO - Add Option to cancel out of the operation selected
// TODO - Add Operation list and let the user delete any operation
// TODO - Maybe? Reconfigure operations.

export async function mainMenu(directory: string): Promise<void> {
  try {
    console.clear();
    const resolvedDir = resolve(directory);
    console.log(chalk.blue(`📁 File Renamer - ${resolvedDir}\n`));

    // Get list of files
    const originalFileList = await getFileList(resolvedDir);

    if (originalFileList.length === 0) {
      console.log(chalk.yellow('⚠️  No files found in directory.\n'));
      return;
    }

    // Build operations array
    const operations: FileOp[] = [];

    let addMore = true;
    while (addMore) {
      showFileListPreview(originalFileList, operations);

      const currentFileList = FileOp.applyAllToFiles(
        originalFileList,
        operations,
      );

      const operationType = await select({
        message: 'Select an operation:',
        choices: [
          { name: 'To Lowercase', value: 'lowercase' },
          { name: 'To Uppercase', value: 'uppercase' },
          { name: 'To Title Case', value: 'titlecase' },
          { name: 'To Sentence Case', value: 'sentencecase' },
          { name: 'Replace Text', value: 'replace' },
          { name: 'Insert at Start', value: 'insert-start' },
          { name: 'Insert at End', value: 'insert-end' },
          { name: 'Trim from Start', value: 'trim-start' },
          { name: 'Trim from End', value: 'trim-end' },
          { name: 'Trim Between', value: 'trim-between' },
          { name: 'Add Counter', value: 'counter' },
          { name: 'Apply', value: 'apply' },
          { name: 'Quit', value: 'quit' },
        ],
      });

      switch (operationType) {
        case 'quit': {
          console.log(chalk.yellow('Exiting.\n'));
          return;
        }
        case 'apply': {
          addMore = false;
          break;
        }
        case 'lowercase': {
          const op = await configureLowercaseOp(currentFileList);
          if (op) {
            operations.push(op);
          }
          break;
        }
        case 'uppercase': {
          const op = await configureUppercaseOp(currentFileList);
          if (op) {
            operations.push(op);
          }
          break;
        }
        case 'titlecase': {
          const op = await configureTitleCaseOp(currentFileList);
          if (op) {
            operations.push(op);
          }
          break;
        }
        case 'sentencecase': {
          const op = await configureSentenceCaseOp(currentFileList);
          if (op) {
            operations.push(op);
          }
          break;
        }
        case 'replace': {
          const op = await configureReplaceOp(currentFileList);
          if (op) {
            operations.push(op);
          }
          break;
        }
        case 'insert-start': {
          const op = await configureInsertStartOp(currentFileList);
          if (op) {
            operations.push(op);
          }
          break;
        }
        case 'insert-end': {
          const op = await configureInsertEndOp(currentFileList);
          if (op) {
            operations.push(op);
          }
          break;
        }
        case 'trim-start': {
          const result = await configureTrimStartOp(currentFileList);
          if (result) {
            operations.push(result);
          }

          break;
        }
        case 'trim-end': {
          const result = await configureTrimEndOp(currentFileList);
          if (result) {
            operations.push(result);
          }

          break;
        }
        case 'trim-between': {
          const result = await configureTrimBetweenOp(currentFileList);
          if (result) {
            operations.push(result);
          }

          break;
        }
        case 'counter': {
          const result = await configureCounterOp(currentFileList);
          if (result) {
            operations.push(result);
          }
          break;
        }
        default: {
          break;
        }
      }
    }

    if (operations.length === 0) {
      console.log(chalk.yellow('No operations selected. Exiting.\n'));
      return;
    }

    await executeRename(resolvedDir, originalFileList, operations);
  } catch (error) {
    console.error(
      chalk.red(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`,
      ),
    );
    process.exit(1);
  }
}
