import { select } from '@inquirer/prompts';

import { FileOp } from '@/string_ops/file_op';
import { TrimStartOp, TrimEndOp, TrimBetweenOp } from '@/string_ops/trim';

import { getNumberWithFileUpdates } from '@/utils/number_input';
import { showFileListPreview } from '@/utils/file_preview';

/**
 * @param files The file names as they exist up to this point
 * @returns A TrimStartOp
 */
export async function configureTrimStartOp(
  files: string[],
): Promise<FileOp | undefined> {
  let includeExtension = false;
  let trimLength = 0;

  while (true) {
    console.clear();

    const op = new TrimStartOp({ trimLength, includeExtension });
    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Trim from start',
      choices: [
        {
          name: `Include extension? ${includeExtension ? 'Yes' : 'No'}`,
          value: 'toggleExtension',
        },
        {
          name: `Trim Length: ${trimLength}`,
          value: 'setTrimLength',
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
      case 'setTrimLength':
        trimLength = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from start:',
            min: 0,
            currentValue: trimLength,
          },
          (num, name) => {
            const startTrim = new TrimStartOp({
              trimLength: num,
              includeExtension,
            });

            return startTrim.apply(name);
          },
          files,
        );
        break;
      case 'cancel':
        return undefined;
      case 'add':
        return op;
    }
  }
}

export async function configureTrimEndOp(
  files: string[],
): Promise<FileOp | undefined> {
  let includeExtension = false;
  let trimLength = 0;

  while (true) {
    console.clear();

    const op = new TrimEndOp({ trimLength, includeExtension });
    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Trim from end',
      choices: [
        {
          name: `Include extension? ${includeExtension ? 'Yes' : 'No'}`,
          value: 'toggleExtension',
        },
        {
          name: `Trim Length: ${trimLength}`,
          value: 'setTrimLength',
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
      case 'setTrimLength':
        trimLength = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from start:',
            min: 0,
            currentValue: trimLength,
          },
          (num, name) => {
            const endTrim = new TrimEndOp({
              trimLength: num,
              includeExtension,
            });

            return endTrim.apply(name);
          },
          files,
        );
        break;
      case 'cancel':
        return undefined;
      case 'add':
        return op;
    }
  }
}

export async function configureTrimBetweenOp(
  files: string[],
): Promise<FileOp | undefined> {
  let includeExtension = false;

  let trimStart = 0;
  let trimEnd = 0;

  while (true) {
    console.clear();

    const op = new TrimBetweenOp({
      startIndex: trimStart,
      endIndex: trimEnd,
      includeExtension,
    });

    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Trim between indices',
      choices: [
        {
          name: `Include extension? ${includeExtension ? 'Yes' : 'No'}`,
          value: 'toggleExtension',
        },
        {
          name: `Trim Start: ${trimStart}`,
          value: 'setTrimStart',
        },
        {
          name: `Trim End: ${trimEnd}`,
          value: 'setTrimEnd',
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
      case 'setTrimStart':
        trimStart = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from start:',
            min: 0,
            currentValue: trimStart,
          },
          (num, name) => {
            const trimBetween = new TrimBetweenOp({
              includeExtension,
              startIndex: num,
              endIndex: trimEnd,
            });

            return trimBetween.apply(name);
          },
          files,
        );
        break;
      case 'setTrimEnd':
        trimEnd = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from end:',
            min: 0,
            currentValue: trimEnd,
          },
          (num, name) => {
            const trimBetween = new TrimBetweenOp({
              includeExtension,
              startIndex: trimStart,
              endIndex: num,
            });

            return trimBetween.apply(name);
          },
          files,
        );
        break;
      case 'cancel':
        return undefined;
      case 'add':
        return op;
    }
  }
}
