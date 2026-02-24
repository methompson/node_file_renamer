import { CounterOp } from '@/string_ops/counter';
import { FileOp } from '@/string_ops/file_op';
import { showFileListPreview } from '@/utils/file_preview';
import { getNumberWithFileUpdates } from '@/utils/number_input';
import { singleCharacterInput } from '@/utils/single_character_input';
import { number, select } from '@inquirer/prompts';

export async function configureCounterOp(
  files: string[],
): Promise<FileOp | undefined> {
  let counterStart = 1;
  let position = 0;
  let paddedLength = 1;
  let paddingChar = '0';
  let fromStart = true;
  let includeExtension = false;

  while (true) {
    console.clear();

    const op = new CounterOp({
      counterStart,
      position,
      paddedLength,
      paddingChar,
      fromStart,
      includeExtension,
    });

    showFileListPreview(files, [op]);

    const menu = await select({
      message: 'Insert at start',
      choices: [
        {
          name: `Starting number for counter: ${counterStart}`,
          value: 'setCounterStart',
        },
        {
          name: `Position to insert at: ${position}`,
          value: 'setPosition',
        },
        {
          name: `Padded length: ${paddedLength}`,
          value: 'setPaddedLength',
        },
        {
          name: `Padding character: '${paddingChar}'`,
          value: 'setPaddingChar',
        },
        {
          name: `Insert from start of filename? ${fromStart ? 'Yes' : 'No'}`,
          value: 'toggleFromStart',
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
      case 'setCounterStart':
        const start = await number({
          message: 'Starting number for counter:',
        });

        if (start) {
          counterStart = start;
        }

        break;
      case 'setPosition':
        position = await getNumberWithFileUpdates(
          {
            message: 'Number of characters to trim from start:',
            min: 0,
            currentValue: position,
          },
          (num, name, index) => {
            const op = new CounterOp({
              counterStart,
              position: num,
              paddedLength: paddedLength,
              paddingChar,
            });

            return op.apply(name, index);
          },
          files,
        );
        break;
      case 'setPaddedLength':
        paddedLength = await getNumberWithFileUpdates(
          {
            message: 'Padded Length:',
            min: 1,
            currentValue: paddedLength,
          },
          (num, name, index) => {
            const op = new CounterOp({
              counterStart,
              position,
              paddedLength: num,
              paddingChar,
            });

            return op.apply(name, index);
          },
          files,
        );

        break;
      case 'setPaddingChar':
        // const newPadding = await input({
        //   message: 'Padding character:',
        //   default: paddingChar,
        //   prefill: 'editable',
        //   validate: (str) => {
        //     console.log('Validate', str);
        //     return (
        //       str.length === 1 || 'Please enter a single character for padding'
        //     );
        //   },
        //   pattern: /^.$/, // Ensure only a single character is accepted
        // });

        // paddingChar = newPadding;

        paddingChar = await singleCharacterInput(
          {
            message: 'Padding character:',
            defaultValue: paddingChar,
          },
          (str, name, index) => {
            const op = new CounterOp({
              counterStart,
              position,
              paddedLength,
              paddingChar: str,
            });

            return op.apply(name, index);
          },
          files,
        );

        break;
      case 'toggleFromStart':
        fromStart = !fromStart;
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
