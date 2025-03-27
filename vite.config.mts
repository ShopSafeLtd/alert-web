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
import analyze from 'rollup-plugin-analyzer';

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
      visualizer() as PluginOption,
      analyze(),
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
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('antd')) return 'vendor-antd';
              if (id.includes('apollo')) return 'vendor-apollo';
              if (id.includes('lodash')) return 'vendor-lodash';
              if (id.includes('mapbox')) return 'vendor-mapbox';
              if (id.includes('@sentry')) return 'vendor-sentry';
              if (id.includes('@deck.gl')) return 'vendor-deckgl';
              if (id.includes('@nivo')) return 'vendor-nivo';
              if (id.includes('tinymce')) return 'vendor-tinymce';
              if (
                id.includes('ag-charts-react') ||
                id.includes('ag-charts-community')
              )
                return 'vendor-ag-charts';
              // Split out all other vendors into smaller chunks by package
              const parts = id.split('node_modules/')[1].split('/');
              const name = parts[0].startsWith('@')
                ? `${parts[0]}/${parts[1]}`
                : parts[0];
              return `vendor-${name}`;
            }

            if (id.includes('/src/views/')) {
              const match = id.match(/\/src\/views\/([^/]+)/);
              if (match && match[1]) {
                return `view-${match[1]}`;
              }
            }

            if (id.includes('/src/components/')) return 'components';
            if (id.includes('/src/containers/')) return 'containers';
            if (id.includes('/src/hooks/')) return 'hooks';
            if (id.includes('/src/utils/')) return 'utils';
            if (id.includes('/src/layouts/')) return 'layouts';
            if (id.includes('/src/providers/')) return 'providers';

            return undefined;
          },
        },
      },
      assetsInlineLimit: 8192,
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
      port: 3004,
      host: 'localhost',
    },
  };
});
