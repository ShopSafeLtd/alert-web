import type React from 'react';
import type { Editor } from 'tinymce';

import { useRef } from 'react';

interface Props {
  investigationId: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export interface ImagesData {
  offenders: {
    images: {
      url: string;
    }[];
    name: string;
  }[];
}

interface Return {
  editorRef: React.MutableRefObject<Editor | null>;
  onSubmit: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useEditText = ({ investigationId, onClose, onSelect }: Props): Return => {
  const editorRef = useRef<Editor | null>(null);

  const onSubmit = () => {
    onSelect(editorRef.current?.getContent() ?? '');
    onClose();
  };

  return {
    editorRef,
    onSubmit,
  };
};

export default useEditText;
