import { defineConfig } from 'vite';
import { resolve } from 'path';

const name = 'countryFlag';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, `src/${name}.js`),
      name,
      formats: ['es'],
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['react', 'react-dom', '@clayui/*'],
      output: {
        entryFileNames: `assets/${name}-[hash].js`,
        assetFileNames: `assets/${name}-[hash][extname]`,
      },
    },
    outDir: `build/static/${name}`,
    emptyOutDir: true,
    minify: true,
  },
})