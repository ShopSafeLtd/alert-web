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
  } = useListBusinesses();

  return (
    <View
      data={data}
      loading={loading}
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      addVisible={addVisible}
      toggleAddVisible={toggleAddVisible}
    />
  );
};

export default ListBusinesses;
