import React from 'react';
import useListInvestigations from './useListInvestigations';
import View from './ListInvestigations.view';

const ListInvestigations = () => {
  const {
    data,
    loading,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
  } = useListInvestigations();

  return (
    <View
      data={data}
      loading={loading}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
      updateInvestigationList={updateInvestigationList}
    />
  );
};

export default ListInvestigations;
