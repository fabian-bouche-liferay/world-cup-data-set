import { defineConfig } from 'vite';
import { resolve } from 'path';

const name = 'teamFilter';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, `src/${name}.js`),
      name,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@clayui/*'],
      output: {
        entryFileNames: `assets/${name}-[hash].js`,
      },
    },
    outDir: `build/static/${name}`,
    emptyOutDir: true,
    minify: true,
  },
});