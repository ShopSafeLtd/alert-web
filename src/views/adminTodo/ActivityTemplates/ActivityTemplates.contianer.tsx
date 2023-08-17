import React from 'react';
import useActivityTemplates from './useActivityTemplates';
import View from './ActivityTemplates.view';
import type { ListData } from '../useActivities';

interface Props {
  tableData: ListData[];
  loading: boolean;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
  ) => void;
}
const ActivitiesTemplatesContianer = ({
  tableData,
  loading,
  updateTemplates,
}: Props) => {
  const {
    toggleAddTemplate,
    createActivity,
    toggleEdit,
    deleteQuestion,
    addActivity,
    onClose,
    selectedActivity,
    activityTemplateForm,
  } = useActivityTemplates({
    tableData,
    updateTemplates,
  });
  return (
    <View
      tableData={tableData}
      loading={loading}
      updateTemplates={updateTemplates}
      toggleAddTemplate={toggleAddTemplate}
      createActivity={createActivity}
      toggleEdit={toggleEdit}
      deleteQuestion={deleteQuestion}
      addActivity={addActivity}
      onClose={onClose}
      selectedActivity={selectedActivity}
      activityTemplateForm={activityTemplateForm}
    />
  );
};

export default ActivitiesTemplatesContianer;
