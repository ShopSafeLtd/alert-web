import React from 'react';
import View from './CrimeTypeList.view';
import useCrimeTypeList from './useCrimeTypeList';

const CrimeTypeList = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,
    incidentId,
    setIncidentId,
    editIncident,
    toggleEditIncident,
    addIncident,
    toggleAddIncident,
    updateCrimeTypeList,
    saving,
    deleteConfirm,
    impactData,
    impactLoading,
    involvedData,
    involvedLoading,
    addImpact,
    addInvolved,
    toggleAddImpact,
    toggleAddInvolved,
    updateImpactList,
    updateInvolvedList,
    updateTagParent,
  } = useCrimeTypeList();
  return (
    <View
      updateTagParent={updateTagParent}
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      incidentId={incidentId}
      setIncidentId={setIncidentId}
      editIncident={editIncident}
      toggleEditIncident={toggleEditIncident}
      addIncident={addIncident}
      toggleAddIncident={toggleAddIncident}
      updateCrimeTypeList={updateCrimeTypeList}
      saving={saving}
      deleteConfirm={deleteConfirm}
      impactData={impactData}
      impactLoading={impactLoading}
      involvedData={involvedData}
      involvedLoading={involvedLoading}
      addImpact={addImpact}
      addInvolved={addInvolved}
      toggleAddImpact={toggleAddImpact}
      toggleAddInvolved={toggleAddInvolved}
      updateImpactList={updateImpactList}
      updateInvolvedList={updateInvolvedList}
    />
  );
};

export default CrimeTypeList;
