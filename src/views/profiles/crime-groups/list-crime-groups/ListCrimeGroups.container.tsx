import React from 'react';
import useListCrimeGroups from './useListCrimeGroups';
import View from './ListCrimeGroups.view';

const ListCrimeGroups = () => {
  const {
    data,
    loading,
    setSearch,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    setGallery,
    variables,
    setOrder,
    groups,
    groupsLoading,
    addInvestigation,
    toggleAddInvestigation,
  } = useListCrimeGroups();

  return (
    <View
      data={data}
      loading={loading}
      variables={variables}
      setSearch={setSearch}
      sortFilter={sortFilter}
      clearFilters={clearFilters}
      toggleSortFilter={toggleSortFilter}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      setOrder={setOrder}
      groups={groups}
      groupsLoading={groupsLoading}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
    />
  );
};

export default ListCrimeGroups;
