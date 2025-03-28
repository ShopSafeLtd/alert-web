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
      compression(),
      visualizer({ open: true }) as PluginOption,
      mode !== 'production' &&
        analyzer({
          analyzerMode: 'static',
        }),
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
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const knownVendors = new Set([
                'react',
                'react-dom',
                'antd',
                'apollo',
                'lodash',
                'mapbox-gl',
                '@sentry',
                '@deck.gl/core',
                '@nivo/bar',
                'tinymce',
                'ag-grid-community',
                'ag-grid-enterprise',
                'ag-charts-enterprise',
                'ag-charts-community',
                'ag-charts-react',
                'ag-grid-charts-enterprise',
              ]);

              const parts = id.split('node_modules/')[1].split('/');
              const name = parts[0].startsWith('@')
                ? `${parts[0]}/${parts[1]}`
                : parts[0];

              if (knownVendors.has(name)) {
                return `vendor-${name}`;
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
