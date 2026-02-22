import { Command } from 'commander';
import { number } from '@inquirer/prompts';

import { mainMenu } from '@/main_menu';
import { getNumberWithFileUpdates } from './utils/number_input';
import { TrimStartOp } from './string_ops/trim';

main();

async function main() {
  const program = new Command();

  program
    .name('file-renamer')
    .description('CLI tool for batch renaming files')
    .version('1.0.0');

  program
    .command('rename')
    .description('Rename files in a directory')
    .option(
      '-d, --directory <path>',
      'Directory containing files to rename',
      process.cwd(),
    )
    .action(async (options) => {
      await mainMenu(options.directory).catch((error) => {
        console.error('Error:', error);
      });

      // const files = [
      //   '_file_with_extra_information_1023.txt',
      //   '_file_with_extra_information_1024.txt',
      //   '_file_with_extra_information_1025.txt',
      //   '_file_with_extra_information_1026.txt',
      //   '_file_with_extra_information_1027.txt',
      //   '_file_with_extra_information_1028.txt',
      // ];

      // const answer = await getNumberWithFileUpdates(
      //   {
      //     min: 0,
      //     message: 'Enter a number:',
      //   },
      //   (num, name) => {
      //     const leftTrim = new TrimStartOp({
      //       trimLength: num,
      //     });

      //     return leftTrim.apply(name);
      //   },
      //   files,
      // );

      // console.log('Answer:', answer);
    });

  program.parse();
}
