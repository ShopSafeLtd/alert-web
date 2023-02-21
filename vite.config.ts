import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';
// import checker from 'vite-plugin-checker';
import { EsLinter, linterPlugin, TypeScriptLinter } from 'vite-plugin-linter';
import removeConsole from 'vite-plugin-remove-console';

// local host launch fix
const dns = require('node:dns');
dns.setDefaultResultOrder('verbatim');

const path = require('path');

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    envCompatible(),
    viteTsconfigPaths(),
    svgrPlugin(),
    removeConsole(), // will remove console from prod builds, remove if testing is needed on live
    linterPlugin({
      include: ['./src/**/*.ts', './src/**/*.tsx'],
      linters: [
        new EsLinter({
          configEnv: configEnv,
          serveOptions: { clearCacheOnStart: true, useEslintrc: true },
        }),
        new TypeScriptLinter(),
      ],

      build: {
        includeMode: 'filesInFolder',
        disable: true,
      },
    }),
    // checker({
    //   // checks for ts and eslint errors on dev, remove if not needed/any issues such as high memory usage
    //   typescript: true,
    //   eslint: {
    //     lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
    //   },
    // }),
  ],
  build: {
    outDir: 'build',
    sourcemap: 'inline',
    minify: 'esbuild',
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
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
    port: 3000,
    host: 'localhost',
  },
}));
