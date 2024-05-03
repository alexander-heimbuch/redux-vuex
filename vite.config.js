/// <reference types="vitest" />
import {resolve} from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: 'ReduxVuex',
      fileName: (format) => `redux-vuex.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'redux']
    },
  },
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  },
});
