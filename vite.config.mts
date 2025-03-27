import { defineConfig, loadEnv, type PluginOption } from 'vite';
import React from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';
import { compression } from 'vite-plugin-compression2';
import removeConsole from 'vite-plugin-remove-console';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// local host launch fix
import dns from 'node:dns';

import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { analyzer } from 'vite-bundle-analyzer';

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
      svgrPlugin(),
      mode === 'production' && removeConsole(),
      compression(),
      mode !== 'production' && (visualizer() as PluginOption),
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
                'ag-charts-react',
                'ag-charts-community',
              ]);

              const parts = id.split('node_modules/')[1].split('/');
              const name = parts[0].startsWith('@')
                ? `${parts[0]}/${parts[1]}`
                : parts[0];

              if (knownVendors.has(name)) {
                return `vendor-${name}`;
              }
            }

            // Split nested subdirectories within form-components into their own chunks
            const formComponentMatch = id.match(
              /\/components\/form-components\/([^/]+)\//
            );
            if (formComponentMatch && formComponentMatch[1]) {
              return `component-form-${formComponentMatch[1]}`;
            }

            // Split large component folders into separate chunks
            const componentMatch = id.match(/\/components\/([^/]+)\//);
            if (componentMatch && componentMatch[1]) {
              return `component-${componentMatch[1]}`;
            }

            // Split views into separate chunks
            const viewMatch = id.match(/\/views\/([^/]+)\//);
            if (viewMatch && viewMatch[1]) {
              return `view-${viewMatch[1]}`;
            }

            // Split containers into separate chunks
            const containerMatch = id.match(/\/containers\/([^/]+)\//);
            if (containerMatch && containerMatch[1]) {
              return `container-${containerMatch[1]}`;
            }

            // Split routes/pages into separate chunks
            if (
              id.includes('src/router') ||
              id.includes('src/routes') ||
              id.includes('src/pages')
            ) {
              return 'router';
            }

            return undefined;
          },
        },
      },
      assetsInlineLimit: 8192,
    },
    resolve: {
      alias: [
        {
          find: 'react',
          replacement: path.resolve(__dirname, 'node_modules/react'),
        },
        {
          find: 'react-dom',
          replacement: path.resolve(__dirname, 'node_modules/react-dom'),
        },
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
