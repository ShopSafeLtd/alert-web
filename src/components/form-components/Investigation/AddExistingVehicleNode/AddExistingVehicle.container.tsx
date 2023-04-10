import React from 'react';

import View from './AddExistingVehicle.view';
import useAddExistingVehicle from './useAddExistingVehicle';
import type { Vehicle } from '../../../react-flow/nodes/vehicle-node';

interface Props {
  onClose: () => void;
  onSubmit: (value: Vehicle) => void;
  investigationId: string;
}

const SelectVehicleNode = ({
  onClose,
  investigationId,
  onSubmit,
}: Props): JSX.Element => {
  const { onSubmitButton, saving, data, loading, search, setSearch, onSelect } =
    useAddExistingVehicle({ onClose, onSubmit, investigationId });

  return (
    <View
      // lightBoxOpen={lightBoxOpen}
      // openLightbox={openLightbox}
      onSubmit={onSubmitButton}
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

export default SelectVehicleNode;
