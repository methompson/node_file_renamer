import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  console.log('Building with NODE_ENV:', options.env?.NODE_ENV);

  return {
    entry: { file_renamer: './src/index.ts' },
    noExternal: [
      '@inquirer/prompts',
      '@metools/tcheck',
      '@metools/utils',
      'chalk',
      'commander',
    ],
    splitting: false,
    sourcemap: true,
    clean: true,
    target: ['node22'],
    minify: true,
    treeshake: true,
  };
});
