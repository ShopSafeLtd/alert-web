import useChecklists from '#/views/checklist/list-checklists/useChecklists';
import React from 'react';

import ChecklistTemplatesView from './ChecklistTemplates.view';

const ChecklistTemplatesContainer: React.FC = () => {
  const {
    createActive,
    createChecklistOpen,
    data,
    deleteTemplate,
    loading,
    selectedChecklist,
    toggleCreateChecklistDrawer,
  } = useChecklists();

  return (
    <ChecklistTemplatesView
      createActive={createActive}
      createChecklistOpen={createChecklistOpen}
      data={data}
      deleteTemplate={deleteTemplate}
      loading={loading}
      selectedChecklist={selectedChecklist}
      toggleCreateChecklistDrawer={toggleCreateChecklistDrawer}
    />
  );
};

export default ChecklistTemplatesContainer;
