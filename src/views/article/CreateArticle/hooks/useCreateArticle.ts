import { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { Props } from '../types/CreateArticle';

const useCreateArticle = (): Props => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const log = () => {
    if (editorRef.current) {
      const html = editorRef.current.getContent();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const images = doc.body.querySelectorAll('img');
      const imageSrcs = Array.from(images).map((image) => image.src);
      console.log(imageSrcs);

      // remove all new lines from innerHTML
      doc.body.innerHTML = doc.body.innerHTML.replace(/&nbsp;/g, '');

      // remove all new lines from innerText
      doc.body.innerText = doc.body.innerText.replace(/(\r\n|\n|\r)/gm, '');

      const innerText =
        doc.body.innerText.length > 200
          ? `${doc.body.innerText.substring(0, 200)}...`
          : doc.body.innerText;
      console.log(innerText);
    }
  };

  const exampleImageUploadHandler = (
    blobInfo: { blob: () => string | Blob; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT);

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ message: `HTTP Error: ${xhr.status}`, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(new Error(`HTTP Error: ${xhr.status}`));
          return;
        }

        console.log(xhr.responseText);
        console.log(JSON.parse(xhr.responseText)[0]);
        const json = JSON.parse(xhr.responseText)[0];

        if (!json || typeof json.url !== 'string') {
          reject(new Error(`Invalid JSON: ${xhr.responseText}`));
          return;
        }

        resolve(json.url);
      };

      xhr.onerror = () => {
        reject(
          new Error(
            `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
          )
        );
      };

      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  const preview = () => {
    if (editorRef.current) {
      editorRef.current.execCommand('mcePreview');
    }
  };

  return {
    editorRef,
    log,
    preview,
    exampleImageUploadHandler,
  };
};

export default useCreateArticle;
