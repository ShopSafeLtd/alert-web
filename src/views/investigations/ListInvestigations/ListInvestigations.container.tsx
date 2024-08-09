import React from 'react';

import View from './ListInvestigations.view';
import useListInvestigations from './useListInvestigations';

const ListInvestigations = () => {
  const {
    addInvestigation,
    data,
    loading,
    onPaginationChange,
    toggleAddInvestigation,
    updateInvestigationList,
  } = useListInvestigations();

  return (
    <View
      addInvestigation={addInvestigation}
      data={data}
      loading={loading}
      onPaginationChange={onPaginationChange}
      toggleAddInvestigation={toggleAddInvestigation}
      updateInvestigationList={updateInvestigationList}
    />
  );
};

export default ListInvestigations;
