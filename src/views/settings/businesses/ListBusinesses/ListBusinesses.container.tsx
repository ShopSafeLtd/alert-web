import React from 'react';

import View from './ListBusinesses.view';
import useListBusinesses from './useListBusinesses';

const ListBusinesses = () => {
  const {
    addVisible,
    canDelete,
    currencyFilter,
    data,
    deleteConfirm,
    divisionFilter,
    filtersOpen,
    groupData,
    groupFilter,
    linkVisible,
    loading,
    onSearchChange,
    onSubmit,
    onUpdateLinkBusiness,
    pagination,
    parentData,
    parentFilter,
    policeAreaFilter,
    saving,
    searchValue,
    setCurrencyFilter,
    setDivisionFilter,
    setGroupFilter,
    setPagination,
    setParentFilter,
    setPoliceAreaFilter,
    setTagFilter,
    tagFilter,
    tags,
    toggleAddVisible,
    toggleFiltersOpen,
    toggleLinkVisible,
  } = useListBusinesses();

  return (
    <View
      addVisible={addVisible}
      canDelete={canDelete}
      currencyFilter={currencyFilter}
      data={data}
      deleteConfirm={deleteConfirm}
      divisionFilter={divisionFilter}
      filtersOpen={filtersOpen}
      groupData={groupData}
      groupFilter={groupFilter}
      linkVisible={linkVisible}
      loading={loading}
      onSearchChange={onSearchChange}
      onSubmit={onSubmit}
      onUpdateLinkBusiness={onUpdateLinkBusiness}
      pagination={pagination}
      parentData={parentData}
      parentFilter={parentFilter}
      policeAreaFilter={policeAreaFilter}
      saving={saving}
      searchValue={searchValue}
      setCurrencyFilter={setCurrencyFilter}
      setDivisionFilter={setDivisionFilter}
      setGroupFilter={setGroupFilter}
      setPagination={setPagination}
      setParentFilter={setParentFilter}
      setPoliceAreaFilter={setPoliceAreaFilter}
      setTagFilter={setTagFilter}
      tagFilter={tagFilter}
      tags={tags}
      toggleAddVisible={toggleAddVisible}
      toggleFiltersOpen={toggleFiltersOpen}
      toggleLinkVisible={toggleLinkVisible}
    />
  );
};

export default ListBusinesses;
