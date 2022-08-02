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
  } = useCrimeTypeList();
  return (
    <View
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
    />
  );
};

export default CrimeTypeList;
