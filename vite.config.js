const path = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: 'ReduxVuex',
      fileName: (format) => `redux-vuex.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'redux']
    },
  },
  plugins: [vue()]
});
