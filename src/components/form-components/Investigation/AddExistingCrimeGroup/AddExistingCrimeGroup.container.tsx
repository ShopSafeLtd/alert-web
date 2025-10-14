import React from 'react';

import View from './AddExistingCrimeGroup.view';
import useAddExistingCrimeGroup from './useAddExistingCrimeGroup';

interface Props {
  crimeGroupIds: string[] | undefined;
  onClose: () => void;
}

const AddExistingCrimeGroup = ({
  crimeGroupIds,
  onClose,
}: Props): JSX.Element => {
  const { data, loading, onSelect, onSubmit, saving, search, setSearch } =
    useAddExistingCrimeGroup({ crimeGroupIds, onClose });

  return (
    <View
      // lightBoxOpen={lightBoxOpen}
      data={data}
      loading={loading}
      onClose={onClose}
      onSelect={onSelect}
      // openLightbox={openLightbox}
      onSubmit={onSubmit}
      saving={saving}
      search={search}
      setSearch={setSearch}
      // onPaginationChange={onPaginationChange}
      // setCurrentId={setCurrentId}
      // selectedOffender={selectedOffender}
    />
  );
};

export default AddExistingCrimeGroup;
