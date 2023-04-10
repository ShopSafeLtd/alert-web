import React from 'react';
import View from './CreateCrimeGroup.view';
import useCreateCrimeGroup from './useCreateCrimeGroup';

const CreateCrimeGroup = () => {
  const {
    loading,
    offendersData,
    offendersSelected,
    searchData,
    selectOffender,
    addOffender,
    toggleAddOffender,
    onSubmit,
    removeOffender,
    submitting,
  } = useCreateCrimeGroup();
  return (
    <View
      selectOffender={selectOffender}
      offendersData={offendersData}
      offendersSelected={offendersSelected}
      loading={loading}
      searchData={searchData}
      addOffender={addOffender}
      toggleAddOffender={toggleAddOffender}
      onSubmit={onSubmit}
      removeOffender={removeOffender}
      submitting={submitting}
    />
  );
};

export default CreateCrimeGroup;
