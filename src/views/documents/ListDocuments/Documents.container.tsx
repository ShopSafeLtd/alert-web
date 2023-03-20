import React from 'react';
import View from './DocumentsView';
import useListDocuments from './hooks/listDocuments';

const DocumentsContainer = () => {
  const { data, toggleAddDocument, addDocument, isAdmin, loading } =
    useListDocuments();

  return (
    <View
      data={data}
      toggleAddDocument={toggleAddDocument}
      isAdmin={isAdmin}
      addDocument={addDocument}
      loading={loading}
    />
  );
};

export default DocumentsContainer;
