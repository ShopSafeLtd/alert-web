/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import type { RcFile, UploadRequestOption } from 'rc-upload/lib/interface';

const getExtension = (filename: string): string =>
  filename.slice(filename.lastIndexOf('.') - 1 + 2);

/**
 * This interface represents the response body after a successful file upload,
 * detailing properties of the uploaded file and its storage information.
 *
 * @interface UploadResponseBody
 * @property {any} file - Original file properties.
 * @property {string} mimetype - The MIME type of the uploaded file.
 * @property {string} url - The SAS (Shared Access Signature) URL for the uploaded file.
 * @property {string} blobName - The blob name or filename on the storage server.
 */
interface UploadResponseBody {
  file: never; // Original file properties.
  mimetype: string; // The MIME type of the uploaded file.
  url: string; // The SAS (Shared Access Signature) URL for the uploaded file.
  blobName: string; // The blob name or filename on the storage.
}

/**
 * Custom request handler for uploading files. To be used with the Antd Upload component customRequest prop.
 * Will upload the file to the storage container Temp.
 *
 *
 * @param {Object} options - The upload request options.
 * @param {Blob | string | RcFile} options.file - The file to be uploaded.
 * @param {function(body: UploadResponseBody, xhr: XMLHttpRequest): void} [options.onSuccess] - The callback to be executed when the upload is successful.
 * @param {function(event: UploadRequestError | ProgressEvent, body?: any): void} [options.onError] - The callback to be executed when an error occurs during the upload.
 *
 * @returns {void}
 *
 * @example
 * customRequest({
 *     file: myFile,
 *     onSuccess: (body, xhr) => {
 *         console.log("Upload succeeded!", body);
 *     },
 *     onError: (error) => {
 *         console.error("Upload failed!", error);
 *     }
 * });
 */

const customRequest = ({
  file,
  onSuccess,
  onError,
}: UploadRequestOption): void => {
  let filename: string;

  if (typeof file === 'string') {
    filename = `${uuidv4()}`;
  } else if ('name' in file) {
    filename = `${uuidv4()}.${getExtension(file.name)}`;
  } else {
    filename = `${uuidv4()}`;
  }
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

      xhr.send(file);
    });

  const getRequestUrl = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        'POST',
        'https://util-server-go-595137580681.herokuapp.com/get-upload-url',
        true
      );
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

  getRequestUrl()
    .then((sasUrl) => {
      const fileType =
        typeof file !== 'string' && 'type' in file
          ? file.type
          : 'application/octet-stream';
      return sendRequest(sasUrl, fileType);
    })
    .then((uploadXhr) => {
      if (onSuccess && typeof file !== 'string') {
        onSuccess(
          [
            {
              ...file,
              mimetype: file.type,
              url: uploadXhr.responseURL,
              blobName: filename,
            },
          ],
          uploadXhr
        );
      }
    })
    .catch((error) => {
      try {
        const xhr3 = new XMLHttpRequest();

        const upload = ({
          blob,
          fileName,
        }: {
          blob: Blob;
          fileName: string;
        }): Promise<string> =>
          new Promise((resolve, reject) => {
            xhr3.withCredentials = false;
            xhr3.open('POST', import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT);

            xhr3.addEventListener('load', () => {
              if (xhr3.status === 403) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({ message: `HTTP Error: ${xhr3.status}`, remove: true });
                return;
              }

              if (xhr3.status < 200 || xhr3.status >= 300) {
                reject(new Error(`HTTP Error: ${xhr3.status}`));
                return;
              }
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
              const json = JSON.parse(xhr3.responseText)[0];

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              if (!json || typeof json.url !== 'string') {
                reject(new Error(`Invalid JSON: ${xhr3.responseText}`));
                return;
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
              resolve(json.url);
            });

            xhr3.onerror = () => {
              reject(
                new Error(
                  `Image upload failed due to a XHR Transport error. Code: ${xhr3.status}`
                )
              );
            };

            const formData = new FormData();
            formData.append('file', blob, fileName);

            xhr3.send(formData);
          });

        void upload({
          blob: file as RcFile,
          fileName: filename,
        }).then((url) => {
          const type =
            typeof file !== 'string' && 'type' in file
              ? file.type
              : 'application/octet-stream';

          if (onSuccess && typeof file !== 'string') {
            onSuccess(
              [
                {
                  ...file,
                  mimetype: type,
                  url,
                  blobName: filename,
                },
              ],
              xhr3
            );
          }
        });
      } catch {
        if (onError) {
          onError(new Error('Failed to get the SAS URL.'));
        }
      }
    });
};

export { customRequest as default };
//
// const customRequest = ({
//   file,
//   onSuccess,
//   onError,
// }: UploadRequestOption): void => {
//   let filename: string;
//
//   if (typeof file === 'string') {
//     filename = `${uuidv4()}`;
//   } else if ('name' in file) {
//     filename = `${uuidv4()}.${getExtension(file.name)}`;
//   } else {
//     filename = `${uuidv4()}`;
//   }
//
//   try {
//     const xhr = new XMLHttpRequest();
//
//     xhr.open(
//       'POST',
//       'https://util-server-go-595137580681.herokuapp.com/get-upload-urls',
//       true
//     );
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({ filename }));
//
//     xhr.onload = () => {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         const responseBody = JSON.parse(xhr.responseText) as {
//           url: string;
//         };
//         const { url: sasUrl } = responseBody;
//
//         if (!sasUrl) {
//           throw new Error('Failed to get the SAS URL');
//         }
//
//         const type =
//           typeof file !== 'string' && 'type' in file
//             ? file.type
//             : 'application/octet-stream';
//         const uploadXhr = new XMLHttpRequest();
//
//         uploadXhr.open('PUT', sasUrl, true);
//         uploadXhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
//         uploadXhr.setRequestHeader('Content-Type', type);
//
//         uploadXhr.onload = () => {
//           if (uploadXhr.status >= 200 && uploadXhr.status < 300) {
//             if (onSuccess && typeof file !== 'string') {
//               onSuccess(
//                 [
//                   {
//                     ...file,
//                     mimetype: type,
//                     url: sasUrl,
//                     blobName: filename,
//                   },
//                 ],
//                 uploadXhr
//               );
//             }
//           } else {
//             throw new Error('Failed to get the SAS URL');
//           }
//         };
//
//         uploadXhr.onerror = () => {
//           if (onError) {
//             throw new Error('Failed to get the SAS URL');
//           }
//         };
//
//         uploadXhr.send(file);
//       } else {
//         throw new Error('Failed to get the SAS URL');
//       }
//     };
//
//     xhr.onerror = () => {
//       throw new Error('Failed to get the SAS URL');
//     };
//   } catch {
//       if (onError) {
//         onError(new Error('Failed to get the SAS URL'));
//       }
//   }
// };
//
// export { customRequest as default };
