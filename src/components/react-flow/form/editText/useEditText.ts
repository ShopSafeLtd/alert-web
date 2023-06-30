import type React from 'react';
import { useRef } from 'react';
import type { Editor } from 'tinymce';

interface Props {
  onClose: () => void;
  onSelect: (value: string) => void;
  investigationId: string;
}

export interface ImagesData {
  offenders: {
    name: string;
    images: {
      url: string;
    }[];
  }[];
}

interface Return {
  onSubmit: () => void;
  editorRef: React.MutableRefObject<Editor | null>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useEditText = ({ onClose, onSelect, investigationId }: Props): Return => {
  const editorRef = useRef<Editor | null>(null);

  const onSubmit = () => {
    onSelect(editorRef.current?.getContent() ?? '');
    onClose();
  };

  return {
    onSubmit,
    editorRef,
  };
};

export default useEditText;
