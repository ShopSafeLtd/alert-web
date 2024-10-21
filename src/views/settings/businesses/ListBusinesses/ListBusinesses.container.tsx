import React from 'react';

import View from './ListBusinesses.view';
import useListBusinesses from './useListBusinesses';

const ListBusinesses = () => {
  const {
    addVisible,
    data,
    deleteConfirm,
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
    saving,
    searchValue,
    setGroupFilter,
    setPagination,
    setParentFilter,
    setTagFilter,
    tagFilter,
    tags,
    toggleAddVisible,
    toggleLinkVisible,
  } = useListBusinesses();

  return (
    <View
      addVisible={addVisible}
      data={data}
      deleteConfirm={deleteConfirm}
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
      saving={saving}
      searchValue={searchValue}
      setGroupFilter={setGroupFilter}
      setPagination={setPagination}
      setParentFilter={setParentFilter}
      setTagFilter={setTagFilter}
      tagFilter={tagFilter}
      tags={tags}
      toggleAddVisible={toggleAddVisible}
      toggleLinkVisible={toggleLinkVisible}
    />
  );
};

export default ListBusinesses;
