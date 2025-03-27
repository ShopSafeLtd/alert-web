import React from 'react';

import View from './ActivityTemplates.view';
import useActivityTemplates from './useActivityTemplates';

const ActivitiesTemplatesContianer = () => {
  const {
    activityTemplateForm,
    addActivity,
    createActivity,
    deleteQuestion,
    loading,
    onClose,
    selectedActivity,
    tableData,
    toggleAddTemplate,
    toggleEdit,
    updateTemplates,
  } = useActivityTemplates();
  return (
    <View
      activityTemplateForm={activityTemplateForm}
      addActivity={addActivity}
      createActivity={createActivity}
      deleteQuestion={deleteQuestion}
      loading={loading}
      onClose={onClose}
      selectedActivity={selectedActivity}
      tableData={tableData}
      toggleAddTemplate={toggleAddTemplate}
      toggleEdit={toggleEdit}
      updateTemplates={updateTemplates}
    />
  );
};

export default ActivitiesTemplatesContianer;
