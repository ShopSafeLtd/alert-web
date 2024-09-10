import React from 'react';

import View from './CreateCrimeGroup.view';
import useCreateCrimeGroup from './useCreateCrimeGroup';

const CreateCrimeGroup = () => {
  const {
    addOffender,
    offendersData,
    onSubmit,
    removeOffender,
    selectOffender,
    submitting,
    toggleAddOffender,
  } = useCreateCrimeGroup();
  return (
    <View
      addOffender={addOffender}
      offendersData={offendersData}
      onSubmit={onSubmit}
      removeOffender={removeOffender}
      selectOffender={selectOffender}
      submitting={submitting}
      toggleAddOffender={toggleAddOffender}
    />
  );
};

export default CreateCrimeGroup;
