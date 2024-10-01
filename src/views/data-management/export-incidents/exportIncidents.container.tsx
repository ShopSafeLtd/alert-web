import React from 'react';

import View from './exportIncidents.view';
import useExportIncidents from './useExportIncidents';

const ExportIncidentsContainer = () => {
  const { dispatch, getZip, loading, selectedGroups, state } =
    useExportIncidents();
  return (
    <View
      crimeGroups={state.crimeGroupOptions}
      dispatch={dispatch}
      getZip={getZip}
      loading={loading}
      selectedGroups={selectedGroups}
      state={state}
    />
  );
};

export default ExportIncidentsContainer;
