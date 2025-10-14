import React from 'react';

import View from './EditText.view';
import useEditText from './useEditText';

interface Props {
  data: null | string;
  investigationId: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}
const EditTextContainer = ({
  data,
  investigationId,
  onClose,
  onSelect,
}: Props): JSX.Element => {
  const { editorRef, onSubmit } = useEditText({
    investigationId,
    onClose,
    onSelect,
  });

  return (
    <View
      data={data}
      editorRef={editorRef}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditTextContainer;
