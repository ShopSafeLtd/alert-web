import React from 'react';

import View from './exportIncidents.view';
import useExportIncidents from './useExportIncidents';

const ExportIncidentsContainer = () => {
  const { dispatch, getZip, loading, mutationLoading, selectedGroups, state } =
    useExportIncidents();
  return (
    <View
      crimeGroups={state.crimeGroupOptions}
      dispatch={dispatch}
      getZip={getZip}
      loading={loading}
      mutationLoading={mutationLoading}
      selectedGroups={selectedGroups}
      state={state}
    />
  );
};

export default ExportIncidentsContainer;
