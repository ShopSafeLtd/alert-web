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
    takeAllSchemes,
    setTakeAllSchemes,
  } = useListInvestigations();

  return (
    <View
      data={data}
      loading={loading}
      addInvestigation={addInvestigation}
      toggleAddInvestigation={toggleAddInvestigation}
      updateInvestigationList={updateInvestigationList}
      takeAllSchemes={takeAllSchemes}
      setTakeAllSchemes={setTakeAllSchemes}
    />
  );
};

export default ListInvestigations;
