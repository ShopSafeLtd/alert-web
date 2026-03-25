import React from 'react';

import View from './ListCrimeGroups.view';
import useListCrimeGroups from './useListCrimeGroups';

const ListCrimeGroups = () => {
  const {
    clearFilters,
    data,
    groups,
    groupsLoading,
    loading,
    setCreatedAtFilter,
    setGallery,
    setGroupsFilter,
    setOrder,
    setSearch,
    sortFilter,
    toggleSortFilter,
    variables,
  } = useListCrimeGroups();

  return (
    <View
      clearFilters={clearFilters}
      data={data}
      groups={groups}
      groupsLoading={groupsLoading}
      loading={loading}
      setCreatedAtFilter={setCreatedAtFilter}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setOrder={setOrder}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      variables={variables}
    />
  );
};

export default ListCrimeGroups;
