import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'PostcssPluginPx2Unit',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
    minify: false,
  },
});
