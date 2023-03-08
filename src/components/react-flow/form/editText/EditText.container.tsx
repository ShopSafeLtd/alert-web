import React from 'react';
import View from './EditText.view';
import useEditText from './useEditText';

interface Props {
  onClose: () => void;
  onSelect: (value: string) => void;
  investigationId: string;
  data: string | null;
}
const EditTextContainer = ({
  onClose,
  onSelect,
  investigationId,
  data,
}: Props): JSX.Element => {
  const { onSubmit, editorRef } = useEditText({
    onClose,
    onSelect,
    investigationId,
  });

  return (
    <View
      onSubmit={onSubmit}
      data={data}
      onClose={onClose}
      editorRef={editorRef}
    />
  );
};

export default EditTextContainer;
