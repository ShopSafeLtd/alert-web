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
  const { onSubmit, saving, data, loading, search, setSearch, onSelect } =
    useAddExistingVehicle({ onClose, vehicleIds });

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

export default AddExistingVehicle;
