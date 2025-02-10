import { defineConfig, loadEnv } from 'vite';
import React from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import dns from 'node:dns';
import path from 'path';

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
      // Remove console.logs in production but keep warnings/errors
      // removeConsole(),
      // Must be last
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
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()), // Force cache busting
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      chunkSizeWarningLimit: 1000, // Avoid chunk warning
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const modules = ['react', 'react-dom', '@clerk/clerk-js'];
              const chunk = modules.find((module) => id.includes(module));
              return chunk ? `vendor-${chunk.replace('@', '')}` : 'vendor';
            }
          },
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
      port: 3000,
      host: 'localhost',
      hmr: {
        timeout: 30000, // Extend timeout to prevent chunk loading errors
      },
    },
    optimizeDeps: {
      include: ['@clerk/clerk-js'], // Preload Clerk.js to avoid dynamic import failures
    },
  };
});
