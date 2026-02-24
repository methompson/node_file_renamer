import chalk from 'chalk';
import {
  createPrompt,
  isBackspaceKey,
  isEnterKey,
  useKeypress,
  useState,
} from '@inquirer/core';
import { fileListPreviewLine, findLongestFileLength } from './file_preview';

interface SingleCharacterInputConfig {
  message?: string;
  defaultValue?: string;
}

export async function singleCharacterInput(
  config: SingleCharacterInputConfig,
  filenameCallback: (str: string, name: string, index: number) => string,
  filesList: string[],
) {
  const keyboardInput = createPrompt<string, SingleCharacterInputConfig>(
    (config, done) => {
      const prompt = config.message ?? 'Please enter a single character:';

      const [char, setChar] = useState(config.defaultValue ?? '');
      const [warning, setWarning] = useState('');

      useKeypress((key, rl) => {
        if (warning) {
          setWarning('');
        }

        if (isEnterKey(key)) {
          done(char);
        } else if (isBackspaceKey(key)) {
          console.log('Backspace pressed');
          setChar('');
        } else {
          const val = rl.line;
          if (val.length <= 1) {
            setChar(val);
          } else {
            setWarning('Please enter only a single character.');
          }
        }

        // Clear the input after capturing the character
        rl.clearLine(0);
      });

      let i = 0;
      const filesToShow = filesList.slice(0, 5);
      const longestFile = findLongestFileLength(filesToShow);

      const fileUpdates = filesToShow
        .map((f) =>
          fileListPreviewLine(f, filenameCallback(char, f, i++), longestFile),
        )
        .join('\n');

      return `${fileUpdates}\n${chalk.green('?')} ${prompt} ${char}${warning ? `\n${chalk.red(warning)}` : ''}`;
    },
  );

  return keyboardInput(config);
}
