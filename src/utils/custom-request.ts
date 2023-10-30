/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';
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
      const responseBody = JSON.parse(xhr.responseText) as {
        url: string;
      };
      const { url: sasUrl } = responseBody;

      if (!sasUrl) {
        if (onError) onError(new Error('Failed to get the SAS URL'));
        void message.error('Failed to upload file');
        return;
      }

      const type =
        typeof file !== 'string' && 'type' in file
          ? file.type
          : 'application/octet-stream';
      const uploadXhr = new XMLHttpRequest();

      uploadXhr.open('PUT', sasUrl, true);
      uploadXhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
      uploadXhr.setRequestHeader('Content-Type', type);

      uploadXhr.onload = () => {
        if (uploadXhr.status >= 200 && uploadXhr.status < 300) {
          if (onSuccess && typeof file !== 'string') {
            onSuccess(
              [
                {
                  ...file,
                  mimetype: type,
                  url: sasUrl,
                  blobName: filename,
                },
              ],
              uploadXhr
            );
          }
        } else if (onError)
          onError(new Error(`Upload failed with status: ${uploadXhr.status}`));
      };

      uploadXhr.onerror = () => {
        if (onError) onError(new Error('Upload encountered a network error'));
      };

      uploadXhr.send(file);
    } else if (onError)
      onError(new Error(`Request failed with status: ${xhr.status}`));
  };

  xhr.onerror = () => {
    if (onError)
      onError(new Error('Network error encountered when getting SAS URL'));
  };
};

export { customRequest as default };
