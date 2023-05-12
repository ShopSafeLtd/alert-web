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
  } = useListBusinesses();

  return (
    <View
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
    />
  );
};

export default ListBusinesses;
