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

// Build timestamp for cache-busting
const buildTimestamp = Date.now().toString();

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
      // purgeCss({
      //   content: [
      //     './src/**/*.html',
      //     './src/**/*.tsx',
      //     './src/**/*.jsx',
      //     './src/**/*.ts',
      //     './src/**/*.js',
      //   ],
      //   safelist: [
      //     /-(leave|enter|appear)(|-(to|from|active))$/,
      //     /^(?!cursor-move).+-move$/,
      //     /^router-link(|-exact)-active$/,
      //     /data-v-.*/,
      //     /^ant-/,
      //     /^hljs-/,
      //     /^yarl__/,
      //     /^mapbox/,           // MapboxDraw protection
      //     /^mapboxgl/,         // MapboxDraw protection
      //     /mapbox-gl-draw/,    // MapboxDraw protection
      //   ],
      //   defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      // }),
      envCompatible(),
      viteTsconfigPaths(),
      mode === 'production' && removeConsole(),
      compression({
        algorithm: 'gzip',
        exclude: [/\.(br|gz)$/],
        threshold: 1024,
        deleteOriginalAssets: false,
      }),
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br|gz)$/],
      }),
      mode !== 'production' && (visualizer({ open: true }) as PluginOption),
      mode !== 'production' &&
        analyzer({
          analyzerMode: 'static',
        }),
      sentryVitePlugin({
        org: 'nvoyy-group',
        project: 'alert-web',
        disable: mode === 'development' || !env.SENTRY_AUTH_TOKEN,
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: './build/**',
          ignore: '*/tinymce/**',
        },
      }),
    ],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    },
    optimizeDeps: {
      include: ['lodash-es', 'date-fns', 'ag-charts-react', 'ag-grid-react'],
    },
    build: {
      outDir: 'build',
      sourcemap: 'hidden' as const,
      minify: 'esbuild' as const,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1500,
      cssCodeSplit: true,
      reportCompressedSize: false,
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.match(/\/node_modules\/(react|react-dom|scheduler)\//)) {
                return 'vendor-react';
              }
              if (id.includes('ag-grid-react')) return 'vendor-ag-grid';
              if (id.includes('node_modules/antd')) return 'vendor-antd';
              if (id.includes('node_modules/d3')) return 'vendor-d3';
              if (id.includes('ag-charts')) return 'vendor-ag-charts';
              if (id.includes('ag-grid')) return 'vendor-ag-grid';
              if (id.includes('lodash')) return 'vendor-lodash';
              if (id.includes('date-fns')) return 'vendor-date-fns';
              return 'vendor';
            }
          },
          chunkFileNames: `assets/js/[name].${buildTimestamp}.[hash].js`,
          entryFileNames: `assets/js/[name].${buildTimestamp}.[hash].js`,
          assetFileNames: `assets/[ext]/[name].${buildTimestamp}.[hash].[ext]`,
        },
      },
    },
    resolve: {
      alias: [
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
