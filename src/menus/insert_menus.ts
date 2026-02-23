import { FileOp } from '@/string_ops/file_op';
import { InsertEndOp, InsertStartOp } from '@/string_ops/insert';
import { showFileListPreview } from '@/utils/file_preview';
import { getNumberWithFileUpdates } from '@/utils/number_input';
import { input, select } from '@inquirer/prompts';

export async function configureInsertStartOp(
  files: string[],
): Promise<FileOp | undefined> {
  let insertStr = '';
  let position = 0;
  let includeExtension = false;

  while (true) {
    console.clear();
    const op = new InsertStartOp({
      insertStr,
      position,
      includeExtension,
    });

    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Insert at start',
      choices: [
        {
          name: `String to insert: ${insertStr}`,
          value: 'setInsertStr',
        },
        {
          name: `Position to insert at: ${position}`,
          value: 'setPosition',
        },
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
      case 'setInsertStr':
        insertStr = await input({
          message: 'String to insert:',
          default: insertStr,
        });
        break;
      case 'setPosition':
        position = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from start:',
            min: 0,
            currentValue: position,
          },
          (num, name) => {
            const insertStart = new InsertStartOp({
              insertStr,
              position: num,
              includeExtension,
            });

            return insertStart.apply(name);
          },
          files,
        );
        break;
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

export async function configureInsertEndOp(
  files: string[],
): Promise<FileOp | undefined> {
  let insertStr = '';
  let position = 0;
  let includeExtension = false;

  while (true) {
    console.clear();
    const op = new InsertEndOp({
      insertStr,
      position,
      includeExtension,
    });

    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Insert at End',
      choices: [
        {
          name: `String to insert: ${insertStr}`,
          value: 'setInsertStr',
        },
        {
          name: `Position to insert at: ${position}`,
          value: 'setPosition',
        },
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
      case 'setInsertStr':
        insertStr = await input({
          message: 'String to insert:',
          default: insertStr,
          prefill: 'editable',
        });
        break;
      case 'setPosition':
        position = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from start:',
            min: 0,
            currentValue: position,
          },
          (num, name) => {
            const insertEnd = new InsertEndOp({
              insertStr,
              position: num,
              includeExtension,
            });

            return insertEnd.apply(name);
          },
          files,
        );
        break;
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
