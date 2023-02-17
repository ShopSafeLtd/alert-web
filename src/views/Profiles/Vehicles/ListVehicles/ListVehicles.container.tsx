import React from 'react';
import useListVehicles from './useListVehicles';
import View from './ListVehicles.view';

const ListVehicles = () => {
  const {
    data,
    loading,
    search,
    setSearch,
    addVehicle,
    toggleAddVehicle,
    updateVehicleList,
  } = useListVehicles();

  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addVehicle={addVehicle}
      toggleAddVehicle={toggleAddVehicle}
      updateVehicleList={updateVehicleList}
    />
  );
};

export default ListVehicles;
