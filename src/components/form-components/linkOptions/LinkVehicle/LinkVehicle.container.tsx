import type { VehicleData } from 'types/DataType';

import React from 'react';

import View from './LinkVehicle.view';
import useLinkVehicle from './useLinkVehicle';

interface Props {
  onClose: () => void;
  takeAllSchemes?: boolean;
  update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
}

const LinkVehicle = ({
  onClose,
  takeAllSchemes,
  update,
  vehicleIds,
}: Props): JSX.Element => {
  const {
    clearFilters,
    data,
    fetchMoreScroll,
    filterVariables,
    groups,
    groupsLoading,
    lightBoxOpen,
    loading,
    onSubmit,
    openLightbox,
    selectedVehicle,
    setCreatedAtFilter,
    setGroupsFilter,
    setOrder,
    setSearch,
    setSelectedVehicle,
  } = useLinkVehicle({ onClose, takeAllSchemes, update, vehicleIds });

  return (
    <View
      clearFilters={clearFilters}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      filterVariables={filterVariables}
      groups={groups}
      groupsLoading={groupsLoading}
      lightBoxOpen={lightBoxOpen}
      loading={loading}
      onSubmit={onSubmit}
      openLightbox={openLightbox}
      selectedVehicle={selectedVehicle}
      setCreatedAtFilter={setCreatedAtFilter}
      setGroupsFilter={setGroupsFilter}
      setOrder={setOrder}
      setSearch={setSearch}
      setSelectedVehicle={setSelectedVehicle}
    />
  );
};

export default LinkVehicle;
