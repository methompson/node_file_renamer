import { input, select } from '@inquirer/prompts';

import { FileOp } from '@/string_ops/file_op';
import { ReplaceOp } from '@/string_ops/replace';
import { showFileListPreview } from '@/utils/file_preview';

export async function configureReplaceOp(
  files: string[],
): Promise<FileOp | undefined> {
  let searchValue = '';
  let replaceValue = '';
  let includeExtension = false;

  while (true) {
    console.clear();
    const op = new ReplaceOp({ searchValue, replaceValue, includeExtension });

    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Replace Text',
      choices: [
        {
          name: `String to find: ${searchValue}`,
          value: 'setSearchValue',
        },
        {
          name: `String to replace with: ${replaceValue}`,
          value: 'setReplaceValue',
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
      case 'setSearchValue':
        searchValue = await input({
          message: 'String to find:',
          default: searchValue,
        });
        break;
      case 'setReplaceValue':
        replaceValue = await input({
          message: 'String to replace with:',
          default: replaceValue,
        });
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
