import { InsertEndOp, InsertStartOp } from '@/string_ops/insert';
import { showFileListPreview } from '@/utils/file_preview';
import { getNumberWithFileUpdates } from '@/utils/number_input';
import { getStringWithFileUpdates } from '@/utils/string_input_with_preview';
import { select } from '@inquirer/prompts';

export async function configureInsertOps(
  files: string[],
): Promise<InsertEndOp | InsertStartOp | undefined> {
  let insertStr = '';
  let position = 0;
  let includeExtension = false;
  let start = true;

  const makeOp = (opt?: { insertStr?: string; position?: number }) =>
    start
      ? new InsertStartOp({
          insertStr: opt?.insertStr ?? insertStr,
          position: opt?.position ?? position,
          includeExtension,
        })
      : new InsertEndOp({
          insertStr: opt?.insertStr ?? insertStr,
          position: opt?.position ?? position,
          includeExtension,
        });

  while (true) {
    console.clear();
    const op = makeOp();

    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Insert at start',
      choices: [
        {
          name: `Insert at start or end? Current: ${start ? 'Start' : 'End'}`,
          value: 'toggleStartEnd',
        },
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
        insertStr = await getStringWithFileUpdates(
          { message: 'String to insert:', currentValue: insertStr },
          (str, name) => {
            const replaceOp = makeOp({ insertStr: str });

            return replaceOp.apply(name);
          },
          files,
        );
        break;
      case 'setPosition':
        position = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from start:',
            min: 0,
            currentValue: position,
          },
          (num, name) => {
            const preview = makeOp({ position: num });
            return preview.apply(name);
          },
          files,
        );
        break;
      case 'toggleExtension':
        includeExtension = !includeExtension;
        break;
      case 'toggleStartEnd':
        start = !start;
        break;
      case 'cancel':
        return undefined;
      case 'add':
        return op;
    }
  }
}
