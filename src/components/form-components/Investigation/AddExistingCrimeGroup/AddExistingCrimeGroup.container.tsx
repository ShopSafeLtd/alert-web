import React from 'react';
import View from './AddExistingCrimeGroup.view';
import useAddExistingCrimeGroup from './useAddExistingCrimeGroup';

interface Props {
  onClose: () => void;
  crimeGroupIds: string[] | undefined;
}

const AddExistingCrimeGroup = ({
  onClose,
  crimeGroupIds,
}: Props): JSX.Element => {
  const { onSubmit, saving, data, loading, search, setSearch, onSelect } =
    useAddExistingCrimeGroup({ onClose, crimeGroupIds });

  return (
    <View
      // lightBoxOpen={lightBoxOpen}
      // openLightbox={openLightbox}
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onClose={onClose}
      onSelect={onSelect}
      // onPaginationChange={onPaginationChange}
      // setCurrentId={setCurrentId}
      // selectedOffender={selectedOffender}
    />
  );
};

export default AddExistingCrimeGroup;
