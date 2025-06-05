export const getCustomUrls = () => {
  const host = window?.location?.host || '';

  const defaultUrls = {
    checklistUpload: import.meta.env.VITE_APP_CHECKLIST_UPLOAD_ENDPOINT,
    csvUpload: import.meta.env.VITE_CSV_UPLOAD_ENDPOINT,
    customUrl: import.meta.env.VITE_GRAPHQL_URL,
    customWsUrl: import.meta.env.VITE_GRAPHQL_WS_URL,
    faceUrl: import.meta.env.VITE_APP_FACE_URL,
    imageAnalyseGo: import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT_GO,
    imageUpload: import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT,
    imageUploadFetch: import.meta.env.VITE_IMAGE_UPLOAD_URL_FETCH,
    imageUploadGo: import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT_GO,
  };

  const customHostToUrlMap: Record<string, typeof defaultUrls> = {
    'jdshield.com': {
      checklistUpload: 'https://app.jdshield.com/api/checklist-images',
      csvUpload: 'https://app.jdshield.com/api/csv',
      customUrl: 'https://app.jdshield.com/api/graphql',
      customWsUrl: 'https://app.jdshield.com/api/graphql/stream',
      faceUrl: 'https://app.jdshield.com/util-api/extract-faces-from-url',
      imageAnalyseGo: 'https://app.jdshield.com/util-api/upload',
      imageUpload: 'https://app.jdshield.com/api/images',
      imageUploadFetch: 'https://app.jdshield.com/util-api/get-upload-url',
      imageUploadGo: 'https://app.jdshield.com/util-api/images',
    },
  };

  const selectedHost = Object.keys(customHostToUrlMap).find((customHost) =>
    host.includes(customHost)
  );

  return selectedHost ? customHostToUrlMap[selectedHost] : defaultUrls;
};
