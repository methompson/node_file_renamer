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
    .option('-d, --directory <path>', 'Directory containing files to rename')
    .action(async (options) => {
      const dir = options.directory ?? process.cwd();
      await mainMenu(dir).catch((error) => {
        console.error('Error:', error);
      });
    });

  program.parse();
}
