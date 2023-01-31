import { Editor as TinyMCEEditor } from 'tinymce';
import React from 'react';

export interface Props {
  editorRef: React.MutableRefObject<TinyMCEEditor | null>;
  log: () => void;
  preview: () => void;
  editorRef: React.MutableRefObject<TinyMCEEditor | null>;

  exampleImageUploadHandler(
    blobInfo: { blob: () => string | Blob; filename: () => string | undefined },
    progress: (arg0: number) => void
  ): Promise<string>;
}
