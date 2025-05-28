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
      envCompatible(),
      viteTsconfigPaths(),
      mode === 'production' && removeConsole(),
      compression({
        algorithm: 'gzip',
        exclude: [/\.(br|gz)$/],
        threshold: 1024,
        deleteOriginalAssets: false,
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
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    },
    build: {
      outDir: 'build',
      sourcemap: 'hidden' as const,
      minify: 'esbuild' as const,
      rollupOptions: {
        output: {
          chunkFileNames: `assets/js/[name].${buildTimestamp}.[hash].js`,
          entryFileNames: `assets/js/[name].${buildTimestamp}.[hash].js`,
          assetFileNames: `assets/[ext]/[name].${buildTimestamp}.[hash].[ext]`,
        },
      },
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      reportCompressedSize: false,
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
