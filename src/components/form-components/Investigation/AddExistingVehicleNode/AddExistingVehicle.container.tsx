import React from 'react';

import type { Vehicle } from '../../../react-flow/nodes/vehicle-node';

import View from './AddExistingVehicle.view';
import useAddExistingVehicle from './useAddExistingVehicle';

interface Props {
  investigationId: string;
  onClose: () => void;
  onSubmit: (value: Vehicle) => void;
}

const SelectVehicleNode = ({
  investigationId,
  onClose,
  onSubmit,
}: Props): JSX.Element => {
  const { data, loading, onSelect, onSubmitButton, saving, search, setSearch } =
    useAddExistingVehicle({ investigationId, onClose, onSubmit });

  return (
    <View
      // lightBoxOpen={lightBoxOpen}
      data={data}
      loading={loading}
      onClose={onClose}
      onSelect={onSelect}
      // openLightbox={openLightbox}
      onSubmit={onSubmitButton}
      saving={saving}
      search={search}
      setSearch={setSearch}
      // onPaginationChange={onPaginationChange}
      // setCurrentId={setCurrentId}
      // selectedOffender={selectedOffender}
    />
  );
};

export default SelectVehicleNode;
