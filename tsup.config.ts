import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  console.log('Building with NODE_ENV:', options.env?.NODE_ENV);

  return {
    entry: ['./src/index.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
    target: ['node22'],
    minify: true,
    treeshake: true,
  };
});
