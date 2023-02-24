import React from 'react';
import { CrimeGroupData } from 'types/DataType';
import View from './AddNewCrimeGroup.view';
import useAddCrimeGroup from './useAddNewCrimeGroup';

interface Props {
  onClose: () => void;
  update: (value: CrimeGroupData) => void;
}

const AddCrimeGroup = ({ onClose, update }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    selectedOffender,
    updateSelectedOffenders,
    selectedOffenderIds,
    openLightbox,
    lightBoxOpen,
  } = useAddCrimeGroup({ onClose, update });

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      setCurrentId={setCurrentId}
      selectedOffender={selectedOffender}
      updateSelectedOffenders={updateSelectedOffenders}
      selectedOffenderIds={selectedOffenderIds}
    />
  );
};

export default AddCrimeGroup;
