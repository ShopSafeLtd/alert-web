import React from 'react';

import View from './ExportActivities.view';
import useExportActivities from './useExportActivities';

const ExportActivitiesContainer = () => {
  const { dispatch, getZip, loading, selectedGroups, state } =
    useExportActivities();
  return (
    <View
      dispatch={dispatch}
      getZip={getZip}
      loading={loading}
      selectedGroups={selectedGroups}
      state={state}
    />
  );
};

export default ExportActivitiesContainer;
