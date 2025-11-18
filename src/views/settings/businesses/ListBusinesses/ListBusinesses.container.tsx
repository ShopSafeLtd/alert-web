import React from 'react';

import View from './ListBusinesses.view';
import useListBusinesses from './useListBusinesses';

const ListBusinesses = () => {
  const {
    addVisible,
    canDelete,
    data,
    deleteConfirm,
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
      data={data}
      deleteConfirm={deleteConfirm}
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
