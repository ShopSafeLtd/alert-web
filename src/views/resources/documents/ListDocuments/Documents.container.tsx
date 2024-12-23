import React from 'react';

import View from './DocumentsView';
import useListDocuments from './hooks/listDocuments';

const DocumentsContainer = () => {
  const {
    addDocument,
    addRights,
    data,
    deleteRights,
    loading,
    onDelete,
    saving,
    toggleAddDocument,
  } = useListDocuments();

  return (
    <View
      addDocument={addDocument}
      addRights={addRights}
      data={data}
      deleteRights={deleteRights}
      loading={loading}
      onDelete={onDelete}
      saving={saving}
      toggleAddDocument={toggleAddDocument}
    />
  );
};

export default DocumentsContainer;
