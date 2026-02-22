import { select, confirm, input, number } from '@inquirer/prompts';
import chalk from 'chalk';
import { resolve } from 'path';

import { FileOp } from '@/string_ops/file_op';
import {
  ToLowerCaseOp,
  ToUpperCaseOp,
  ToTitleCaseOp,
  ToSentenceCaseOp,
} from '@/string_ops/case';
import { ReplaceOp } from '@/string_ops/replace';
import { InsertStartOp, InsertEndOp } from '@/string_ops/insert';
import { TrimStartOp, TrimEndOp } from '@/string_ops/trim';
import { CounterOp } from '@/string_ops/counter';

import { getFileList } from '@/utils/get_files';
import { executeRename } from '@/utils/execute_rename';
import { showFileListPreview } from '@/utils/file_preview';

export async function mainMenu(directory: string): Promise<void> {
  try {
    const resolvedDir = resolve(directory);
    console.log(chalk.blue(`\n📁 File Renamer - ${resolvedDir}\n`));

    // Get list of files
    const fileList = await getFileList(resolvedDir);

    if (fileList.length === 0) {
      console.log(chalk.yellow('⚠️  No files found in directory.\n'));
      return;
    }

    // console.log(chalk.cyan(`Found ${fileList.length} files to process.\n`));
    // fileList.forEach((file, index) => {
    //   console.log(chalk.dim(`${index + 1}. ${file}`));
    // });
    // console.log();

    // Build operations array
    const operations: FileOp[] = [];

    let addMore = true;
    while (addMore) {
      showFileListPreview(fileList, operations);

      const operation = await selectOperation();
      if (operation) {
        operations.push(operation);
        console.log(chalk.green('✓ Operation added\n'));
      } else {
        addMore = false;
      }
    }

    if (operations.length === 0) {
      console.log(chalk.yellow('No operations selected. Exiting.\n'));
      return;
    }

    await executeRename(resolvedDir, fileList, operations);
  } catch (error) {
    console.error(
      chalk.red(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`,
      ),
    );
    process.exit(1);
  }
}

async function selectOperation(): Promise<FileOp | null> {
  const operationType = await select({
    message: 'Select an operation:',
    choices: [
      { name: 'To Lowercase', value: 'lowercase' },
      { name: 'To Uppercase', value: 'uppercase' },
      // { name: 'To Title Case', value: 'titlecase' },
      // { name: 'To Sentence Case', value: 'sentencecase' },
      // { name: 'Replace Text', value: 'replace' },
      // { name: 'Insert at Start', value: 'insert-start' },
      // { name: 'Insert at End', value: 'insert-end' },
      // { name: 'Trim from Start', value: 'trim-start' },
      // { name: 'Trim from End', value: 'trim-end' },
      // { name: 'Add Counter', value: 'counter' },
      { name: 'Done', value: 'done' },
    ],
  });

  switch (operationType) {
    case 'done':
      return null;
    case 'lowercase':
      return await configureLowercaseOp();
    case 'uppercase':
      return await configureUppercaseOp();
    case 'titlecase':
      return new ToTitleCaseOp();
    case 'sentencecase':
      return new ToSentenceCaseOp();
    case 'replace':
      return await configureReplaceOp();
    case 'insert-start':
      return await configureInsertStartOp();
    case 'insert-end':
      return await configureInsertEndOp();
    case 'trim-start':
      return await configureTrimStartOp();
    case 'trim-end':
      return await configureTrimEndOp();
    case 'counter':
      return await configureCounterOp();
    default:
      return null;
  }
}

async function configureLowercaseOp(): Promise<FileOp> {
  const includeExtension = await confirm({
    message: 'Include extension in transformation?',
    default: false,
  });

  return new ToLowerCaseOp({ includeExtension });
}

async function configureUppercaseOp(): Promise<FileOp> {
  const includeExtension = await confirm({
    message: 'Include extension in transformation?',
    default: false,
  });

  return new ToUpperCaseOp({ includeExtension });
}

async function configureReplaceOp(): Promise<FileOp> {
  const searchValue = await input({
    message: 'Text to search for:',
    validate: (value) =>
      value.length > 0 ? true : 'Please enter a search value',
  });

  const replaceValue = await input({
    message: 'Text to replace with:',
  });

  const includeExtension = await confirm({
    message: 'Include extension in replacement?',
    default: false,
  });

  return new ReplaceOp({ searchValue, replaceValue, includeExtension });
}

async function configureInsertStartOp(): Promise<FileOp> {
  const insertStr = await input({
    message: 'Text to insert:',
    validate: (value) =>
      value.length > 0 ? true : 'Please enter text to insert',
  });

  const position = await number({
    message: 'Position to insert at (0 = start):',
    default: 0,
    validate: (value) =>
      typeof value === 'number' && value >= 0
        ? true
        : 'Position must be non-negative',
  });

  const includeExtension = await confirm({
    message: 'Include extension in positioning?',
    default: false,
  });

  return new InsertStartOp({
    insertStr,
    position: position!,
    includeExtension,
  });
}

async function configureInsertEndOp(): Promise<FileOp> {
  const insertStr = await input({
    message: 'Text to insert:',
    validate: (value) =>
      value.length > 0 ? true : 'Please enter text to insert',
  });

  const position = await number({
    message: 'Position from end (0 = end):',
    default: 0,
    validate: (value) =>
      typeof value === 'number' && value >= 0
        ? true
        : 'Position must be non-negative',
  });

  const includeExtension = await confirm({
    message: 'Include extension in positioning?',
    default: false,
  });

  return new InsertEndOp({ insertStr, position: position!, includeExtension });
}

async function configureTrimStartOp(): Promise<FileOp> {
  const trimLength = await number({
    message: 'Number of characters to trim from start:',
    default: 1,
    validate: (value) =>
      typeof value === 'number' && value >= 0
        ? true
        : 'Trim length must be non-negative',
  });

  const includeExtension = await confirm({
    message: 'Include extension in trim length?',
    default: false,
  });

  return new TrimStartOp({ trimLength: trimLength!, includeExtension });
}

async function configureTrimEndOp(): Promise<FileOp> {
  const trimLength = await number({
    message: 'Number of characters to trim from end:',
    default: 1,
    validate: (value) =>
      typeof value === 'number' && value >= 0
        ? true
        : 'Trim length must be non-negative',
  });

  const includeExtension = await confirm({
    message: 'Include extension in trim length?',
    default: false,
  });

  return new TrimEndOp({ trimLength: trimLength!, includeExtension });
}

async function configureCounterOp(): Promise<FileOp> {
  const counterStart = await number({
    message: 'Starting number for counter:',
    default: 1,
    validate: (value) =>
      typeof value === 'number' && value >= 0 ? true : 'Must be non-negative',
  });

  const position = await number({
    message: 'Position to insert counter:',
    default: 0,
    validate: (value) =>
      typeof value === 'number' && value >= 0
        ? true
        : 'Position must be non-negative',
  });

  const prefix = await input({
    message: 'Prefix for counter (optional):',
  });

  const suffix = await input({
    message: 'Suffix for counter (optional):',
  });

  return new CounterOp({
    counterStart: counterStart!,
    position: position!,
    prefix,
    suffix,
  });
}
