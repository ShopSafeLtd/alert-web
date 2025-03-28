import { defineConfig, loadEnv, type PluginOption } from 'vite';
import React from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';
// import removeConsole from 'vite-plugin-remove-console';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// local host launch fix
import dns from 'node:dns';

import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { analyzer } from 'vite-bundle-analyzer';
import removeConsole from 'vite-plugin-remove-console';
import compression from 'vite-plugin-compression2';

dns.setDefaultResultOrder('verbatim');
const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const { mode } = configEnv;
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      React({
        babel: {
          babelrc: true,
        },
      }),
      envCompatible(),
      viteTsconfigPaths(),
      mode === 'production' && removeConsole(),
      mode !== 'production' && (visualizer({ open: true }) as PluginOption),
      mode !== 'production' &&
        analyzer({
          analyzerMode: 'static',
        }),
      compression(),
      sentryVitePlugin({
        org: 'nvoyy-group',
        project: 'alert-web',
        disable: mode === 'development' || !env.SENTRY_AUTH_TOKEN,
        // include: './build',
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          // Specify the directory containing build artifacts
          assets: './build/**',
          ignore: '*/tinymce/**',
        },
      }),
    ],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Core React chunk
              if (
                id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('scheduler') ||
                id.includes('@remix-run')
              ) {
                return 'vendor-react';
              }

              // AG Grid related
              if (id.includes('ag-grid')) {
                return 'vendor-ag-grid';
              }

              // AG Charts related
              if (id.includes('ag-charts')) {
                return 'vendor-ag-charts';
              }

              // Data visualization
              if (
                id.includes('@nivo') ||
                id.includes('@deck.gl') ||
                id.includes('mapbox-gl')
              ) {
                return 'vendor-dataviz';
              }

              // UI Components
              if (id.includes('antd') || id.includes('@ant-design')) {
                return 'vendor-antd';
              }

              // Apollo and GraphQL
              if (id.includes('apollo') || id.includes('graphql')) {
                return 'vendor-apollo';
              }

              // Utils
              if (
                id.includes('lodash') ||
                id.includes('date-fns') ||
                id.includes('moment')
              ) {
                return 'vendor-utils';
              }

              // Sentry
              if (id.includes('@sentry')) {
                return 'vendor-sentry';
              }

              // Editor
              if (id.includes('tinymce')) {
                return 'vendor-editor';
              }

              // Create a common chunk for smaller dependencies
              const MIN_SIZE = 50000; // 50KB threshold
              if (id.length > MIN_SIZE) {
                return 'vendor-common';
              }
            }
          },
        },
      },
      assetsInlineLimit: 8192,
    },
    resolve: {
      alias: [
        // {
        //   find: 'react',
        //   replacement: path.resolve(__dirname, 'node_modules/react'),
        // },
        // {
        //   find: 'react-dom',
        //   replacement: path.resolve(__dirname, 'node_modules/react-dom'),
        // },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
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
      port: 3004,
      host: 'localhost',
    },
  };
});
