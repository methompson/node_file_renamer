import {
  createPrompt,
  isEnterKey,
  useEffect,
  useKeypress,
  useState,
} from '@inquirer/core';
import chalk from 'chalk';
import { fileListPreviewLine, findLongestFileLength } from './file_preview';

interface KeyboardStringInputConfig {
  message?: string;
  currentValue?: string;
}

export async function getStringWithFileUpdates(
  config: KeyboardStringInputConfig,
  filenameCallback: (str: string, name: string, index: number) => string,
  filesList: string[],
) {
  const keyboardStringInput = createPrompt<string, KeyboardStringInputConfig>(
    (config, done) => {
      const prompt = config.message ?? 'Please enter a string:';

      const [str, setStr] = useState(config.currentValue ?? '');
      const [warning, setWarning] = useState('');

      useKeypress((key, rl) => {
        if (warning) {
          setWarning('');
        }

        if (isEnterKey(key)) {
          done(str);
          return;
        }

        setStr(rl.line);
      });

      // Insert the str value, which may include previous input
      useEffect((rl) => {
        rl.write(str);
      }, []);

      let i = 0;
      const filesToShow = filesList.slice(0, 5);
      const longestFile = findLongestFileLength(filesToShow);

      const fileUpdates = filesToShow
        .map((f) =>
          fileListPreviewLine(f, filenameCallback(str, f, i++), longestFile),
        )
        .join('\n');

      return `${fileUpdates}\n${chalk.green('?')} ${prompt} ${str}${warning ? `\n${chalk.red(warning)}` : ''}`;
    },
  );

  return await keyboardStringInput(config);
}
