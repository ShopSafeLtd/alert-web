import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';
// import checker from 'vite-plugin-checker';
import removeConsole from 'vite-plugin-remove-console';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// local host launch fix
const dns = require('node:dns');
dns.setDefaultResultOrder('verbatim');

const path = require('path');

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      envCompatible(),
      viteTsconfigPaths(),
      svgrPlugin(),
      // will remove console from prod builds, remove if testing is needed on live
      removeConsole(),
      // checker({
      //   // checks for ts and eslint errors on dev, remove if not needed/any issues such as high memory usage
      //   typescript: true,
      //   eslint: {
      //     lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      //   },
      // }),
      // must be last
      sentryVitePlugin({
        org: 'nvoyy-group',
        project: 'alert-web',
        include: './build',
        authToken: env.SENTRY_AUTH_TOKEN,
      }),
    ],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
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
  };
});
