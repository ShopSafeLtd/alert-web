import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';

const path = require('path');

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible(),
    viteTsconfigPaths(),
    svgrPlugin(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: (name) => `antd/es/${name}/style`,
    //     },
    //   ],
    // }),
  ],
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
      { find: /^~/, replacement: pathResolve('./node_modules') },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: { 'primary-color': '#13c2c2' },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
    port: 3000,
    host: 'localhost',
  },
});
