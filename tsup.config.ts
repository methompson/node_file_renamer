import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  const prod = options.env?.NODE_ENV !== 'development';

  console.log('Building with NODE_ENV:', options.env?.NODE_ENV);

  return {
    entry: ['./src/index.ts', './src/images/fork_compress.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
    // noExternal: [/(.*)/],
    target: ['node22'],
    minifyIdentifiers: false,
    // minifyWhitespace: prod,
    // minifySyntax: prod,
    treeshake: prod,
  };
});
