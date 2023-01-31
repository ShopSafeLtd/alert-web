import React from 'react';
import View from './CreateArticle.view';
import useCreateArticle from './hooks/useCreateArticle';

const CreateArticleContainer = () => {
  const { log, editorRef, exampleImageUploadHandler, preview } =
    useCreateArticle();

  return (
    <View
      log={log}
      editorRef={editorRef}
      exampleImageUploadHandler={exampleImageUploadHandler}
      preview={preview}
    />
  );
};

export default CreateArticleContainer;
