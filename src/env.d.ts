interface ImportMetaEnv {
  readonly PUBLIC_URL: string;
  readonly VITE_APP_IMAGE_UPLOAD_ENDPOINT: string;
  readonly VITE_GRAPHQL_WS_URL: string;
  readonly VITE_GRAPHQL_URL: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const APP_VERSION: string;
