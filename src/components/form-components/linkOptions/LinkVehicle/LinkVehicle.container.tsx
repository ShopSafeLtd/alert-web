import React from 'react';
import type { VehicleData } from 'types/DataType';
import View from './LinkVehicle.view';
import useLinkVehicle from './useLinkVehicle';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
  takeAllSchemes?: boolean;
}

const LinkVehicle = ({
  onClose,
  update,
  vehicleIds,
  takeAllSchemes,
}: Props): JSX.Element => {
  const {
    onSubmit,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    selectedVehicle,
    openLightbox,
    lightBoxOpen,
    pagination,
  } = useLinkVehicle({ onClose, update, vehicleIds, takeAllSchemes });

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      onSubmit={onSubmit}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onPaginationChange={onPaginationChange}
      setCurrentId={setCurrentId}
      selectedVehicle={selectedVehicle}
      pagination={pagination}
    />
  );
};

export default LinkVehicle;
