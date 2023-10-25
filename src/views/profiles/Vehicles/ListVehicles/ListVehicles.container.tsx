import React from 'react';
import useListVehicles from './useListVehicles';
import View from './ListVehicles.view';

const ListVehicles = () => {
  const {
    data,
    loading,
    setSearch,
    addVehicle,
    toggleAddVehicle,
    // updateVehicleList,
    onSubmit,
    groups,
    groupsLoading,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    customGalleriesData,
    onSelectCustomGalleries,
    setGallery,
    setOrder,
    addInvestigation,
    toggleAddInvestigation,
    variables,
  } = useListVehicles();

  return (
    <View
      data={data}
      loading={loading}
      variables={variables}
      setSearch={setSearch}
      addVehicle={addVehicle}
      toggleAddVehicle={toggleAddVehicle}
      onSubmit={onSubmit}
      sortFilter={sortFilter}
      clearFilters={clearFilters}
      toggleSortFilter={toggleSortFilter}
      groups={groups}
      groupsLoading={groupsLoading}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      customGalleriesData={customGalleriesData}
      setOrder={setOrder}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
      onSelectCustomGalleries={onSelectCustomGalleries}
    />
  );
};

export default ListVehicles;
