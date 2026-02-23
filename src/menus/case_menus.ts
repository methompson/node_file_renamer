import { select } from '@inquirer/prompts';

import { FileOp } from '@/string_ops/file_op';
import {
  ToLowerCaseOp,
  ToUpperCaseOp,
  ToTitleCaseOp,
  ToSentenceCaseOp,
} from '@/string_ops/case';
import { showFileListPreview } from '@/utils/file_preview';

export async function configureLowercaseOp(
  files: string[],
): Promise<FileOp | undefined> {
  let includeExtension = false;

  while (true) {
    console.clear();

    const op = new ToLowerCaseOp({ includeExtension });
    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Make the file name lowercase',
      choices: [
        {
          name: `Include extension? ${includeExtension ? 'Yes' : 'No'}`,
          value: 'toggleExtension',
        },
        {
          name: 'Cancel',
          value: 'cancel',
        },
        {
          name: 'Add File Op',
          value: 'add',
        },
      ],
    });

    switch (menu) {
      case 'toggleExtension':
        includeExtension = !includeExtension;
        break;
      case 'cancel':
        return undefined;
      case 'add':
        return op;
    }
  }
}

export async function configureUppercaseOp(
  files: string[],
): Promise<FileOp | undefined> {
  let includeExtension = false;

  while (true) {
    console.clear();

    const op = new ToUpperCaseOp({ includeExtension });
    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Make the file name UPPERCASE',
      choices: [
        {
          name: `Include extension? ${includeExtension ? 'Yes' : 'No'}`,
          value: 'toggleExtension',
        },
        {
          name: 'Cancel',
          value: 'cancel',
        },
        {
          name: 'Add File Op',
          value: 'add',
        },
      ],
    });

    switch (menu) {
      case 'toggleExtension':
        includeExtension = !includeExtension;
        break;
      case 'cancel':
        return undefined;
      case 'add':
        return op;
    }
  }
}

export async function configureTitleCaseOp(
  files: string[],
): Promise<FileOp | undefined> {
  console.clear();

  const op = new ToTitleCaseOp();
  showFileListPreview(files, [op]);

  const menu = await select({
    message: 'Make the file name Title Case',
    choices: [
      {
        name: 'Cancel',
        value: 'cancel',
      },
      {
        name: 'Add File Op',
        value: 'add',
      },
    ],
  });

  switch (menu) {
    case 'cancel':
      return undefined;
    case 'add':
      return op;
  }
}

export async function configureSentenceCaseOp(
  files: string[],
): Promise<FileOp | undefined> {
  console.clear();

  const op = new ToSentenceCaseOp();
  showFileListPreview(files, [op]);

  const menu = await select({
    message: 'Make the file name Sentence case',
    choices: [
      {
        name: 'Cancel',
        value: 'cancel',
      },
      {
        name: 'Add File Op',
        value: 'add',
      },
    ],
  });

  switch (menu) {
    case 'cancel':
      return undefined;
    case 'add':
      return op;
  }
}
