import React from 'react';

import View from './CrimeTypeList.view';
import useCrimeTypeList from './useCrimeTypeList';

const CrimeTypeList = (): JSX.Element => {
  const {
    addImpact,
    addIncident,
    addInvolved,
    data,
    deleteConfirm,
    editIncident,
    impactData,
    impactLoading,
    incidentId,
    involvedData,
    involvedLoading,
    saving,
    // loading,
    search,
    setIncidentId,
    setSearch,
    toggleAddImpact,
    toggleAddIncident,
    toggleAddInvolved,
    toggleEditIncident,
    updateCrimeTypeList,
    updateImpactList,
    updateInvolvedList,
    updateTagParent,
  } = useCrimeTypeList();
  return (
    <View
      addImpact={addImpact}
      addIncident={addIncident}
      addInvolved={addInvolved}
      data={data}
      deleteConfirm={deleteConfirm}
      editIncident={editIncident}
      impactData={impactData}
      impactLoading={impactLoading}
      incidentId={incidentId}
      involvedData={involvedData}
      involvedLoading={involvedLoading}
      saving={saving}
      // loading={loading}
      search={search}
      setIncidentId={setIncidentId}
      setSearch={setSearch}
      toggleAddImpact={toggleAddImpact}
      toggleAddIncident={toggleAddIncident}
      toggleAddInvolved={toggleAddInvolved}
      toggleEditIncident={toggleEditIncident}
      updateCrimeTypeList={updateCrimeTypeList}
      updateImpactList={updateImpactList}
      updateInvolvedList={updateInvolvedList}
      updateTagParent={updateTagParent}
    />
  );
};

export default CrimeTypeList;
