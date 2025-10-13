import React from 'react';

import View from './AddDocument.view';
import useAddDocument from './useAddDocument';

interface Props {
  investigationId: string;
  onClose: () => void;
}

const AddEvidence = ({ investigationId, onClose }: Props) => {
  const {
    categories,
    categoriesChange,
    categoriesLoading,
    onSubmit,
    saving,
    searchEvidence,
    selectEvidence,
    selectedCategories,
    selectedEvidence,
    toggleSearchEvidence,
  } = useAddDocument({ investigationId, onClose });

  return (
    <View
      categories={categories}
      categoriesChange={categoriesChange}
      categoriesLoading={categoriesLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      searchEvidence={searchEvidence}
      selectEvidence={selectEvidence}
      selectedCategories={selectedCategories}
      selectedEvidence={selectedEvidence}
      toggleSearchEvidence={toggleSearchEvidence}
    />
  );
};

export default AddEvidence;
