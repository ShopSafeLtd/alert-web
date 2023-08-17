import React from 'react';
import View from './Activities.view';
import useActivities from './useActivities';

const ActivitiesContainer = () => {
  const { templateData, loading, updateTemplates } = useActivities();
  return (
    <View
      templateData={templateData}
      loading={loading}
      updateTemplates={updateTemplates}
    />
  );
};

export default ActivitiesContainer;
