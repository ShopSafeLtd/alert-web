import React from 'react';
import View from './AddDocument.view';
import useAddDocument from './useAddDocument';

interface Props {
  onClose: () => void;
  investigationId: string;
}

const AddEvidence = ({ onClose, investigationId }: Props) => {
  const {
    onSubmit,
    selectedCategories,
    categories,
    categoriesChange,
    categoriesLoading,
    saving,
    toggleSearchEvidence,
    selectedEvidence,
    searchEvidence,
    selectEvidence,
  } = useAddDocument({ onClose, investigationId });

  return (
    <View
      selectEvidence={selectEvidence}
      searchEvidence={searchEvidence}
      toggleSearchEvidence={toggleSearchEvidence}
      selectedEvidence={selectedEvidence}
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

export default AddEvidence;
