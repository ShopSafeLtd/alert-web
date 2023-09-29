import React from 'react';
import useExportIncidents from './useExportIncidents';
import View from './exportIncidents.view';

const ExportIncidentsContainer = () => {
  const { loading, state, dispatch, getZip } = useExportIncidents();
  return (
    <View
      loading={loading}
      state={state}
      dispatch={dispatch}
      businesses={state.businessOptions}
      groups={state.groupOptions}
      crimeGroups={state.crimeGroupOptions}
      getZip={getZip}
    />
  );
};

export default ExportIncidentsContainer;
