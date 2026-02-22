import chalk from 'chalk';
import {
  createPrompt,
  isBackspaceKey,
  isEnterKey,
  useKeypress,
  useState,
} from '@inquirer/core';
import { isNumber } from '@metools/tcheck';

const numRe = /^\d+$/;

interface KeyboardNumberInputConfig {
  min?: number;
  max?: number;
  message?: string;
}

function testNumber(opt: { n: number; max?: number; min?: number }) {
  if (isNumber(opt.min) && opt.n < opt.min) {
    return false;
  }

  if (isNumber(opt.max) && opt.n > opt.max) {
    return false;
  }

  return true;
}

export async function getNumberWithFileUpdates(
  config: KeyboardNumberInputConfig,
  filenameCallback: (num: number, name: string) => string,
  filesList: string[],
) {
  const keyboardNumberInput = createPrompt<number, KeyboardNumberInputConfig>(
    (config, done) => {
      const prompt = config.message ?? 'Please enter a number:';

      const [num, setNum] = useState(0);
      const [warning, setWarning] = useState('');

      // Implement logic
      useKeypress((key) => {
        if (warning) {
          setWarning('');
        }

        const numberSetCallback = (newNum: number) => {
          const isValid = testNumber({
            n: newNum,
            max: config.max,
            min: config.min,
          });
          if (isValid) {
            setNum(newNum);
          } else {
            setWarning(
              `Number must be between ${config.min ?? '-∞'} and ${config.max ?? '∞'}`,
            );
          }
        };

        // console.log('\nKey pressed:', key, '\n', 'readline:', rl.line);
        if (isEnterKey(key)) {
          done(num);
        } else if (key.name === 'right') {
          const newNum = num + 1;
          numberSetCallback(newNum);
        } else if (key.name === 'left') {
          const newNum = num - 1;
          numberSetCallback(newNum);
        } else if (isBackspaceKey(key)) {
          // Remove last character from index
          const numStr = `${num}`;
          const newNumStr = numStr.slice(0, -1);

          if (newNumStr === '') {
            setNum(0);
          } else {
            const newNum = parseInt(newNumStr, 10);
            setNum(newNum);
          }
        } else if (numRe.test(key.name)) {
          const newNumStr = `${num}${key.name}`;
          const newNum = parseInt(newNumStr, 10);

          numberSetCallback(newNum);

          // Concat & Verify
        }
      });

      const fileUpdates = filesList
        .slice(0, 5)
        .map((f) => `${f} → ${filenameCallback(num, f)}`)
        .join('\n');

      return `${fileUpdates}\n${chalk.green('?')} ${prompt} ${num}${warning ? `\n${chalk.red(warning)}` : ''}`;
    },
  );

  return keyboardNumberInput(config);
}
