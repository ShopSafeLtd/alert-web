import React from 'react';

import View from './CreateCrimeGroup.view';
import useCreateCrimeGroup from './useCreateCrimeGroup';

const CreateCrimeGroup = () => {
  const {
    addOffender,
    loading,
    offendersData,
    offendersSelected,
    onPaginationChange,
    onSubmit,
    removeOffender,
    searchData,
    selectOffender,
    setSearch,
    submitting,
    toggleAddOffender,
  } = useCreateCrimeGroup();
  return (
    <View
      addOffender={addOffender}
      loading={loading}
      offendersData={offendersData}
      offendersSelected={offendersSelected}
      onPaginationChange={onPaginationChange}
      onSubmit={onSubmit}
      removeOffender={removeOffender}
      searchData={searchData}
      selectOffender={selectOffender}
      setSearch={setSearch}
      submitting={submitting}
      toggleAddOffender={toggleAddOffender}
    />
  );
};

export default CreateCrimeGroup;
