import React from 'react';
import View from './ListBusinesses.view';
import useListBusinesses from './useListBusinesses';

const ListBusinesses = () => {
  const {
    data,
    loading,
    onSearchChange,
    searchValue,
    addVisible,
    toggleAddVisible,
    linkVisible,
    toggleLinkVisible,
    onSubmit,
    saving,
    deleteConfirm,
    pagination,
    setPagination,
    groupData,
    parentData,
    parentFilter,
    setParentFilter,
    setGroupFilter,
    groupFilter,
    tagFilter,
    setTagFilter,
    tags,
  } = useListBusinesses();

  return (
    <View
      parentData={parentData}
      parentFilter={parentFilter}
      setParentFilter={setParentFilter}
      groupData={groupData}
      groupFilter={groupFilter}
      setGroupFilter={setGroupFilter}
      tags={tags}
      tagFilter={tagFilter}
      setTagFilter={setTagFilter}
      pagination={pagination}
      setPagination={setPagination}
      data={data}
      loading={loading}
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      addVisible={addVisible}
      toggleAddVisible={toggleAddVisible}
      linkVisible={linkVisible}
      toggleLinkVisible={toggleLinkVisible}
      onSubmit={onSubmit}
      saving={saving}
      deleteConfirm={deleteConfirm}
    />
  );
};

export default ListBusinesses;
