import React from 'react';

import View from './ListVehicles.view';
import useListVehicles from './useListVehicles';

const ListVehicles = () => {
  const {
    addInvestigation,
    clearFilters,
    customGalleriesData,
    data,
    groups,
    groupsLoading,
    loading,
    onNavigate,
    onSelectCustomGalleries,
    setCreatedAtFilter,
    setGallery,
    setGroupsFilter,
    setOrder,
    setPoliceAreas,
    setSearch,
    sortFilter,
    toggleAddInvestigation,
    toggleSortFilter,
    variables,
  } = useListVehicles();

  return (
    <View
      addInvestigation={addInvestigation}
      clearFilters={clearFilters}
      customGalleriesData={customGalleriesData}
      data={data}
      groups={groups}
      groupsLoading={groupsLoading}
      loading={loading}
      onNavigate={onNavigate}
      onSelectCustomGalleries={onSelectCustomGalleries}
      setCreatedAtFilter={setCreatedAtFilter}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setOrder={setOrder}
      setPoliceAreas={setPoliceAreas}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleAddInvestigation={toggleAddInvestigation}
      toggleSortFilter={toggleSortFilter}
      variables={variables}
    />
  );
};

export default ListVehicles;
