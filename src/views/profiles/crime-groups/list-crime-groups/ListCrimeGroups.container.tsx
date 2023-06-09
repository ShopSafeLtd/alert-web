import React from 'react';
import useListCrimeGroups from './useListCrimeGroups';
import View from './ListCrimeGroups.view';

const ListCrimeGroups = () => {
  const {
    data,
    loading,
    search,
    setSearch,
    groupsFilter,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    gallery,
    setGallery,
    order,
    setOrder,
    groups,
    groupsLoading,
  } = useListCrimeGroups();

  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      sortFilter={sortFilter}
      clearFilters={clearFilters}
      toggleSortFilter={toggleSortFilter}
      gallery={gallery}
      groupsFilter={groupsFilter}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      order={order}
      setOrder={setOrder}
      groups={groups}
      groupsLoading={groupsLoading}
    />
  );
};

export default ListCrimeGroups;
