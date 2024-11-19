// vite.config.mts
import { defineConfig, loadEnv } from "file:///Users/willgarrod/Documents/Projects/alert-web-2/node_modules/vite/dist/node/index.js";
import React from "file:///Users/willgarrod/Documents/Projects/alert-web-2/node_modules/@vitejs/plugin-react/dist/index.mjs";
import viteTsconfigPaths from "file:///Users/willgarrod/Documents/Projects/alert-web-2/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgrPlugin from "file:///Users/willgarrod/Documents/Projects/alert-web-2/node_modules/vite-plugin-svgr/dist/index.mjs";
import envCompatible from "file:///Users/willgarrod/Documents/Projects/alert-web-2/node_modules/vite-plugin-env-compatible/dist/index.mjs";
import { sentryVitePlugin } from "file:///Users/willgarrod/Documents/Projects/alert-web-2/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import removeConsole from "file:///Users/willgarrod/Documents/Projects/alert-web-2/node_modules/vite-plugin-remove-console/dist/index.mjs";
import dns from "node:dns";
import path from "path";
var __vite_injected_original_dirname = "/Users/willgarrod/Documents/Projects/alert-web-2";
dns.setDefaultResultOrder("verbatim");
var pathResolve = (pathStr) => {
  return path.resolve(__vite_injected_original_dirname, pathStr);
};
var vite_config_default = defineConfig((configEnv) => {
  const { mode } = configEnv;
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      React({
        babel: {
          babelrc: true
        }
      }),
      envCompatible(),
      viteTsconfigPaths(),
      svgrPlugin(),
      // will remove console from prod builds, remove if testing is needed on live
      removeConsole(),
      // must be last
      sentryVitePlugin({
        org: "nvoyy-group",
        project: "alert-web",
        disable: mode === "development" || !env.SENTRY_AUTH_TOKEN,
        // include: './build',
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          // Specify the directory containing build artifacts
          assets: "./build/**",
          ignore: "*/tinymce/**"
        }
      })
    ],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version)
    },
    build: {
      outDir: "build",
      sourcemap: true
    },
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") },
        // fix less import by: @import ~
        // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
        { find: /^~/, replacement: pathResolve("./node_modules") }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      open: true,
      port: 3e3,
      host: "localhost"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3dpbGxnYXJyb2QvRG9jdW1lbnRzL1Byb2plY3RzL2FsZXJ0LXdlYi0yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvd2lsbGdhcnJvZC9Eb2N1bWVudHMvUHJvamVjdHMvYWxlcnQtd2ViLTIvdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy93aWxsZ2Fycm9kL0RvY3VtZW50cy9Qcm9qZWN0cy9hbGVydC13ZWItMi92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBSZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdml0ZVRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgc3ZnclBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCBlbnZDb21wYXRpYmxlIGZyb20gJ3ZpdGUtcGx1Z2luLWVudi1jb21wYXRpYmxlJztcbi8vIGltcG9ydCBjaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInO1xuaW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gJ0BzZW50cnkvdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHJlbW92ZUNvbnNvbGUgZnJvbSAndml0ZS1wbHVnaW4tcmVtb3ZlLWNvbnNvbGUnO1xuXG5cbi8vIGxvY2FsIGhvc3QgbGF1bmNoIGZpeFxuaW1wb3J0IGRucyBmcm9tICdub2RlOmRucyc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5kbnMuc2V0RGVmYXVsdFJlc3VsdE9yZGVyKCd2ZXJiYXRpbScpO1xuY29uc3QgcGF0aFJlc29sdmUgPSAocGF0aFN0cjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBwYXRoU3RyKTtcbn07XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKGNvbmZpZ0VudikgPT4ge1xuICBjb25zdCB7IG1vZGUgfSA9IGNvbmZpZ0VudjtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgUmVhY3Qoe1xuICAgICAgICBiYWJlbDoge1xuICAgICAgICAgIGJhYmVscmM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGVudkNvbXBhdGlibGUoKSxcbiAgICAgIHZpdGVUc2NvbmZpZ1BhdGhzKCksXG4gICAgICBzdmdyUGx1Z2luKCksXG4gICAgICAvLyB3aWxsIHJlbW92ZSBjb25zb2xlIGZyb20gcHJvZCBidWlsZHMsIHJlbW92ZSBpZiB0ZXN0aW5nIGlzIG5lZWRlZCBvbiBsaXZlXG4gICAgICByZW1vdmVDb25zb2xlKCksXG4gICAgICAvLyBtdXN0IGJlIGxhc3RcbiAgICAgIHNlbnRyeVZpdGVQbHVnaW4oe1xuICAgICAgICBvcmc6ICdudm95eS1ncm91cCcsXG4gICAgICAgIHByb2plY3Q6ICdhbGVydC13ZWInLFxuICAgICAgICBkaXNhYmxlOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnIHx8ICFlbnYuU0VOVFJZX0FVVEhfVE9LRU4sXG4gICAgICAgIC8vIGluY2x1ZGU6ICcuL2J1aWxkJyxcbiAgICAgICAgYXV0aFRva2VuOiBlbnYuU0VOVFJZX0FVVEhfVE9LRU4sXG4gICAgICAgIHNvdXJjZW1hcHM6IHtcbiAgICAgICAgICAvLyBTcGVjaWZ5IHRoZSBkaXJlY3RvcnkgY29udGFpbmluZyBidWlsZCBhcnRpZmFjdHNcbiAgICAgICAgICBhc3NldHM6ICcuL2J1aWxkLyoqJyxcbiAgICAgICAgICBpZ25vcmU6ICcqL3RpbnltY2UvKionLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgXSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIEFQUF9WRVJTSU9OOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSB9LFxuICAgICAgICAvLyBmaXggbGVzcyBpbXBvcnQgYnk6IEBpbXBvcnQgflxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUvaXNzdWVzLzIxODUjaXNzdWVjb21tZW50LTc4NDYzNzgyN1xuICAgICAgICB7IGZpbmQ6IC9efi8sIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgnLi9ub2RlX21vZHVsZXMnKSB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBsZXNzOiB7XG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgcG9ydDogMzAwMCxcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1UsU0FBUyxjQUFjLGVBQWU7QUFDMVcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sdUJBQXVCO0FBQzlCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sbUJBQW1CO0FBRTFCLFNBQVMsd0JBQXdCO0FBQ2pDLE9BQU8sbUJBQW1CO0FBSTFCLE9BQU8sU0FBUztBQUVoQixPQUFPLFVBQVU7QUFiakIsSUFBTSxtQ0FBbUM7QUFlekMsSUFBSSxzQkFBc0IsVUFBVTtBQUNwQyxJQUFNLGNBQWMsQ0FBQyxZQUFvQjtBQUN2QyxTQUFPLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQ3hDO0FBR0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsY0FBYztBQUN6QyxRQUFNLEVBQUUsS0FBSyxJQUFJO0FBQ2pCLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFDSixPQUFPO0FBQUEsVUFDTCxTQUFTO0FBQUEsUUFDWDtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLE1BQ2Qsa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBO0FBQUEsTUFFWCxjQUFjO0FBQUE7QUFBQSxNQUVkLGlCQUFpQjtBQUFBLFFBQ2YsS0FBSztBQUFBLFFBQ0wsU0FBUztBQUFBLFFBQ1QsU0FBUyxTQUFTLGlCQUFpQixDQUFDLElBQUk7QUFBQTtBQUFBLFFBRXhDLFdBQVcsSUFBSTtBQUFBLFFBQ2YsWUFBWTtBQUFBO0FBQUEsVUFFVixRQUFRO0FBQUEsVUFDUixRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGFBQWEsS0FBSyxVQUFVLFFBQVEsSUFBSSxtQkFBbUI7QUFBQSxJQUM3RDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEVBQUUsTUFBTSxLQUFLLGFBQWEsS0FBSyxRQUFRLGtDQUFXLEtBQUssRUFBRTtBQUFBO0FBQUE7QUFBQSxRQUd6RCxFQUFFLE1BQU0sTUFBTSxhQUFhLFlBQVksZ0JBQWdCLEVBQUU7QUFBQSxNQUMzRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
