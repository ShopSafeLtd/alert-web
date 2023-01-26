interface ImportMetaEnv {
  readonly PUBLIC_URL: string;

  readonly VITE_APP_IMAGE_UPLOAD_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
