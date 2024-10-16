import React from 'react';

import View from './DemDeviceList.view';
import useDemDeviceList from './useDemDeviceList';

const DemDeviceList = (): JSX.Element => {
  const {
    addDemDevice,
    assignToBusiness,
    data,
    editData,
    loading,
    onAssignedBusiness,
    pagination,
    resetPage,
    saving,
    search,
    setAssignToBusiness,
    setEditData,
    setPagination,
    setSearch,
    toggleAddDemDevice,
    updateDemDeviceList,
  } = useDemDeviceList();

  return (
    <View
      addDemDevice={addDemDevice}
      assignToBusiness={assignToBusiness}
      data={data}
      editData={editData}
      loading={loading}
      onAssignedBusiness={onAssignedBusiness}
      pagination={pagination}
      resetPage={resetPage}
      saving={saving}
      search={search}
      setAssignToBusiness={setAssignToBusiness}
      setEditData={setEditData}
      setPagination={setPagination}
      setSearch={setSearch}
      toggleAddDemDevice={toggleAddDemDevice}
      updateDemDeviceList={updateDemDeviceList}
    />
  );
};

export default DemDeviceList;
