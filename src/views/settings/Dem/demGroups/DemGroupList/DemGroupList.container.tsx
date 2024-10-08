import React from 'react';

import View from './DemGroupList.view';
import useDemGroupList from './useDemGroupList';

const DemGroupList = (): JSX.Element => {
  const {
    addDemGroup,
    data,
    editData,
    loading,
    pagination,
    resetPage,
    search,
    setEditData,
    setPagination,
    setSearch,
    toggleAddDemGroup,
    updateDemGroupList,
  } = useDemGroupList();

  return (
    <View
      addDemGroup={addDemGroup}
      data={data}
      editData={editData}
      loading={loading}
      pagination={pagination}
      resetPage={resetPage}
      search={search}
      setEditData={setEditData}
      setPagination={setPagination}
      setSearch={setSearch}
      toggleAddDemGroup={toggleAddDemGroup}
      updateDemGroupList={updateDemGroupList}
    />
  );
};

export default DemGroupList;
