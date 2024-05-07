import React from 'react';
import useListVehicles from './useListVehicles';
import View from './ListVehicles.view';

const ListVehicles = () => {
  const {
    data,
    loading,
    setSearch,
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
    onNavigate,
  } = useListVehicles();
  console.log('customGalleriesData', customGalleriesData);

  return (
    <View
      data={data}
      loading={loading}
      variables={variables}
      setSearch={setSearch}
      onNavigate={onNavigate}
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
