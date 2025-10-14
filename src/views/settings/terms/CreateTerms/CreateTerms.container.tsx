import React from 'react';

import View from './CreateTerms.view';
import useCreateTerms from './useCreateTerms';

const CreateTermsContainer = (): JSX.Element => {
  const { data, editorRef, onClose, onSubmit } = useCreateTerms();

  return (
    <View
      data={data}
      editorRef={editorRef}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default CreateTermsContainer;
