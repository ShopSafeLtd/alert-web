import React from 'react';

import View from './AddExistingOffender.view';
import useAddExistingOffender from './useAddExistingOffender';

interface Props {
  onClose: () => void;
  // update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
}

const AddExistingOffender = ({
  onClose,
  // update,
  offenderIds,
}: Props): JSX.Element => {
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
    openLightbox,
    lightBoxOpen,
  } = useAddExistingOffender({ onClose, offenderIds });

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
    />
  );
};

export default AddExistingOffender;
