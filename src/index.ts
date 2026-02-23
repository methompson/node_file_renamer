#!/usr/bin/env node

import { Command } from 'commander';

import { mainMenu } from '@/menus/main_menu';

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
    });

  program.parse();
}
