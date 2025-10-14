import React from 'react';

import View from './ListCrimeGroups.view';
import useListCrimeGroups from './useListCrimeGroups';

const ListCrimeGroups = () => {
  const {
    addInvestigation,
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
    toggleAddInvestigation,
    toggleSortFilter,
    variables,
  } = useListCrimeGroups();

  return (
    <View
      addInvestigation={addInvestigation}
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
      toggleAddInvestigation={toggleAddInvestigation}
      toggleSortFilter={toggleSortFilter}
      variables={variables}
    />
  );
};

export default ListCrimeGroups;
