import { select } from '@inquirer/prompts';

import { ReplaceOp } from '@/string_ops/replace';
import { showFileListPreview } from '@/utils/file_preview';
import { getStringWithFileUpdates } from '@/utils/string_input_with_preview';

export async function configureReplaceOp(
  files: string[],
): Promise<ReplaceOp | undefined> {
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
        searchValue = await getStringWithFileUpdates(
          { message: 'String to find:' },
          (str, name) => {
            const replaceOp = new ReplaceOp({
              searchValue: str,
              replaceValue,
              includeExtension,
            });

            return replaceOp.apply(name);
          },
          files,
        );

        break;
      case 'setReplaceValue':
        replaceValue = await getStringWithFileUpdates(
          { message: 'String to replace with:' },
          (str, name) => {
            const replaceOp = new ReplaceOp({
              searchValue,
              replaceValue: str,
              includeExtension,
            });

            return replaceOp.apply(name);
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
