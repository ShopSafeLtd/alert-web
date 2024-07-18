import React from 'react';

import View from './CreateCrimeGroup.view';
import useCreateCrimeGroup from './useCreateCrimeGroup';

const CreateCrimeGroup = () => {
  const {
    addOffender,
    fetchMoreScroll,
    loading,
    offendersData,
    offendersSelected,
    onSubmit,
    removeOffender,
    searchData,
    selectOffender,
    submitting,
    toggleAddOffender,
  } = useCreateCrimeGroup();

  return (
    <View
      addOffender={addOffender}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      offendersData={offendersData}
      offendersSelected={offendersSelected}
      onSubmit={onSubmit}
      removeOffender={removeOffender}
      searchData={searchData}
      selectOffender={selectOffender}
      submitting={submitting}
      toggleAddOffender={toggleAddOffender}
    />
  );
};

export default CreateCrimeGroup;
