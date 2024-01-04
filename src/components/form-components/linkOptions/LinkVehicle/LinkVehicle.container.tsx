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
    setSearch,
    selectedVehicle,
    setSelectedVehicle,
    openLightbox,
    lightBoxOpen,
    filterVariables,
    setOrder,
    setGroupsFilter,
    setCreatedAtFilter,
    groups,
    groupsLoading,
    clearFilters,
    fetchMoreScroll,
  } = useLinkVehicle({ onClose, update, vehicleIds, takeAllSchemes });

  return (
    <View
      onSubmit={onSubmit}
      data={data}
      loading={loading}
      setSearch={setSearch}
      selectedVehicle={selectedVehicle}
      setSelectedVehicle={setSelectedVehicle}
      openLightbox={openLightbox}
      lightBoxOpen={lightBoxOpen}
      filterVariables={filterVariables}
      setOrder={setOrder}
      setGroupsFilter={setGroupsFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      groups={groups}
      groupsLoading={groupsLoading}
      clearFilters={clearFilters}
      fetchMoreScroll={fetchMoreScroll}
    />
  );
};

export default LinkVehicle;
