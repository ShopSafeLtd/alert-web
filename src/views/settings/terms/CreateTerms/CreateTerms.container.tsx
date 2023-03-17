import React from 'react';
import View from './CreateTerms.view';
import useCreateTerms from './useCreateTerms';

const CreateTermsContainer = (): JSX.Element => {
  const { onSubmit, editorRef, data, onClose } = useCreateTerms();

  return (
    <View
      onSubmit={onSubmit}
      data={data}
      onClose={onClose}
      editorRef={editorRef}
    />
  );
};

export default CreateTermsContainer;
