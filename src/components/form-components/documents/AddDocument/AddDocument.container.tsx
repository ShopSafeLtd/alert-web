import React from 'react';
import View from './AddDocument.view';
import useAddDocument from './useAddDocument';

interface Props {
  onClose: () => void;
  investigationId: string;
}

const AddDocument = ({ onClose, investigationId }: Props) => {
  const {
    onSubmit,
    selectedCategories,
    categories,
    categoriesChange,
    categoriesLoading,
    saving,
    documentUploadProps,
  } = useAddDocument({ onClose, investigationId });

  return (
    <View
      documentUploadProps={documentUploadProps}
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      categories={categories}
      selectedCategories={selectedCategories}
      categoriesChange={categoriesChange}
      categoriesLoading={categoriesLoading}
    />
  );
};

export default AddDocument;
