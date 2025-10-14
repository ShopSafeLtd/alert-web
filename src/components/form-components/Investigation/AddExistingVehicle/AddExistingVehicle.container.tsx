import React from 'react';

import View from './AddExistingVehicle.view';
import useAddExistingVehicle from './useAddExistingVehicle';

interface Props {
  onClose: () => void;
  vehicleIds: string[] | undefined;
}

const AddExistingVehicle = ({
  onClose,

  vehicleIds,
}: Props): JSX.Element => {
  const { data, loading, onSelect, onSubmit, saving, search, setSearch } =
    useAddExistingVehicle({ onClose, vehicleIds });

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

export default AddExistingVehicle;
