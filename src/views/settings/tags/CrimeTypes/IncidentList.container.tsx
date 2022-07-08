import React from 'react';
import View from './IncidentList.view';
import useIncidentList from './useIncidentList';

const IncidentList = (): JSX.Element => {
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
    updateIncidentList,
    saving,
    deleteConfirm,
  } = useIncidentList();
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
      updateIncidentList={updateIncidentList}
      saving={saving}
      deleteConfirm={deleteConfirm}
    />
  );
};

export default IncidentList;
