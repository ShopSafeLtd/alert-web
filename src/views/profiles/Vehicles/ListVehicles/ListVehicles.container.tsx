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
    // updateVehicleList,
    onSubmit,
    groups,
    groupsLoading,
    groupsFilter,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    customGalleriesData,
    customGalleries,
    onSelectCustomGalleries,
    gallery,
    setGallery,
    order,
    setOrder,
    addInvestigation,
    toggleAddInvestigation,
  } = useListVehicles();

  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addVehicle={addVehicle}
      toggleAddVehicle={toggleAddVehicle}
      // updateVehicleList={updateVehicleList}
      onSubmit={onSubmit}
      sortFilter={sortFilter}
      clearFilters={clearFilters}
      toggleSortFilter={toggleSortFilter}
      groups={groups}
      groupsLoading={groupsLoading}
      gallery={gallery}
      groupsFilter={groupsFilter}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      customGalleriesData={customGalleriesData}
      onSelectCustomGalleries={onSelectCustomGalleries}
      customGalleries={customGalleries}
      order={order}
      setOrder={setOrder}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
    />
  );
};

export default ListVehicles;
