import React from 'react';

import View from './AddExistingOffender.view';
import useAddExistingOffender from './useAddExistingOffender';

interface Props {
  // update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
  onClose: () => void;
}

const AddExistingOffender = ({
  // update,
  offenderIds,
  onClose,
}: Props): JSX.Element => {
  const {
    cascadeOptions,
    data,
    lightBoxOpen,
    loading,
    onPaginationChange,
    onSubmit,
    openLightbox,
    publicOffenderDOB,
    saving,
    search,
    selectedOffender,
    setCascadeOptions,
    setCurrentId,
    setSearch,
  } = useAddExistingOffender({ offenderIds, onClose });

  return (
    <View
      cascadeOptions={cascadeOptions}
      data={data}
      lightBoxOpen={lightBoxOpen}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      onSubmit={onSubmit}
      openLightbox={openLightbox}
      publicOffenderDOB={publicOffenderDOB}
      saving={saving}
      search={search}
      selectedOffender={selectedOffender}
      setCascadeOptions={setCascadeOptions}
      setCurrentId={setCurrentId}
      setSearch={setSearch}
    />
  );
};

export default AddExistingOffender;
