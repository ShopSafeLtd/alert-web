interface ImportMetaEnv {
  readonly PUBLIC_URL: string;
  readonly VITE_APP_IMAGE_UPLOAD_ENDPOINT: string;
  readonly VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT: string;
  readonly VITE_GRAPHQL_WS_URL: string;
  readonly VITE_GRAPHQL_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_MAPBOX_ACCESS_TOKEN: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_MIXPANEL_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const APP_VERSION: string;
