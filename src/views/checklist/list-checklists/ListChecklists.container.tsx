import React from 'react';

import View from './Checklists.view';
import useChecklists from './useChecklists';

const Checklists = (): JSX.Element => {
  const {
    activeChecklistSort,
    activeChecklistsData,
    activeChecklistsLoading,
    checklistFilter,
    createActive,
    createChecklistOpen,
    data,
    deleteChecklist,
    loading,
    saving,
    selectedChecklist,
    setActiveChecklistSort,
    setChecklistFilters,
    toggleCreateChecklistDrawer,
  } = useChecklists();

  return (
    <View
      activeChecklistSort={activeChecklistSort}
      activeChecklistsData={activeChecklistsData}
      activeChecklistsLoading={activeChecklistsLoading}
      checklistFilter={checklistFilter}
      createActive={createActive}
      createChecklistOpen={createChecklistOpen}
      data={data}
      deleteChecklist={deleteChecklist}
      loading={loading}
      saving={saving}
      selectedChecklist={selectedChecklist}
      setActiveChecklistSort={setActiveChecklistSort}
      setChecklistFilters={setChecklistFilters}
      toggleCreateChecklistDrawer={toggleCreateChecklistDrawer}
    />
  );
};

export default Checklists;
