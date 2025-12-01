import type { RcFile } from 'rc-upload/lib/interface';

/**
 * Uploads a video file to Azure Blob Storage using a SAS URL
 * @param sasUrl - The SAS URL obtained from the backend
 * @param file - The video file to upload
 * @param onProgress - Optional callback for upload progress
 * @returns Promise that resolves to the blob URL (without SAS token)
 */
export const uploadVideoToAzure = (
  sasUrl: string,
  file: RcFile,
  onProgress?: (percent: number) => void
): Promise<string> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', sasUrl, true);
    xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
    xhr.setRequestHeader('Content-Type', file.type || 'video/mp4');

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Extract blob URL by removing SAS token
        const blobUrl = sasUrl.split('?')[0];
        resolve(blobUrl);
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during video upload'));
    };

    xhr.send(file);
  });

/**
 * Extracts the file extension from a filename
 */
export const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex >= 0 ? filename.slice(lastDotIndex + 1) : '';
};
