import React from 'react';

import View from './ExportActivities.view';
import useExportActivities from './useExportActivities';

const ExportActivitiesContainer = () => {
  const { dispatch, getZip, loading, mutationLoading, selectedGroups, state } =
    useExportActivities();
  return (
    <View
      dispatch={dispatch}
      getZip={getZip}
      loading={loading}
      mutationLoading={mutationLoading}
      selectedGroups={selectedGroups}
      state={state}
    />
  );
};

export default ExportActivitiesContainer;
