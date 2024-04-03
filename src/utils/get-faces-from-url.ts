import type { ImageFaceType } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';

const getFacesFromUrl = (url: string): Promise<ImageFaceType[]> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', import.meta.env.VITE_APP_FACE_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ url }));

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const responseBody = JSON.parse(xhr.responseText) as {
          faces: ImageFaceType[];
        }[];
        if (responseBody && responseBody[0] && responseBody[0].faces)
          resolve(responseBody[0].faces);
        reject(new Error('Failed to get faces.'));
      } else {
        reject(new Error('Failed to get faces.'));
      }
    };

    xhr.onerror = () =>
      reject(new Error('Network error during getting faces request.'));
  });

export default getFacesFromUrl;
