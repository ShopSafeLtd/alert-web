import { getCustomUrls } from '#/providers/ApolloProvider';
import { v4 as uuidv4 } from 'uuid';

export const customRequest = async (blob: Blob): Promise<null | string> => {
  const filename = `${uuidv4()}.csv`;

  const sendRequest = (url: string, type: string): Promise<XMLHttpRequest> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
      xhr.setRequestHeader('Content-Type', type);

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error('Upload failed during PUT request.'));
        }
      };

      xhr.onerror = () =>
        reject(new Error('Network error during PUT request.'));

      xhr.send(blob);
    });

  const getRequestUrl = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { imageUploadFetch } = getCustomUrls();
      xhr.open('POST', imageUploadFetch, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({ filename }));

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const responseBody = JSON.parse(xhr.responseText) as { url: string };
          resolve(responseBody.url);
        } else {
          reject(new Error('Failed to get the SAS URL.'));
        }
      };

      xhr.onerror = () =>
        reject(new Error('Network error during SAS URL request.'));
    });

  try {
    const sasUrl = await getRequestUrl();
    const fileType = 'text/csv';
    const uploadXhr = await sendRequest(sasUrl, fileType);
    return uploadXhr.responseURL;
  } catch (error) {
    console.error('Error during PUT request:', error);

    try {
      const formData = new FormData();
      formData.append('file', blob);
      const res = await fetch(import.meta.env.VITE_CSV_UPLOAD_ENDPOINT, {
        body: formData,
        method: 'POST',
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const resData: { url: string }[] = await res.json();
      if (resData[0].url) {
        return resData[0].url;
      }
      return null;
    } catch (uploadError) {
      console.error('Error during fallback upload:', uploadError);
      return null;
    }
  }
};
