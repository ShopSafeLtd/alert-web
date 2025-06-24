import React from 'react';

import View from './Checklists.view';
import useChecklists from './useChecklists';

const Checklists = (): JSX.Element => {
  const {
    // checklistSort,
    activeChecklistSort,
    activeChecklistsData,
    activeChecklistsLoading,
    activeTab,
    checklistFilter,
    createActive,
    createChecklistOpen,
    data,
    deleteChecklist,
    deleteTemplate,
    loading,
    selectedChecklist,
    // setChecklistSort,
    setActiveChecklistSort,
    setChecklistFilters,
    toggleCreateChecklistDrawer,
  } = useChecklists();

  return (
    <View
      // checklistSort={checklistSort}
      activeChecklistSort={activeChecklistSort}
      activeChecklistsData={activeChecklistsData}
      activeChecklistsLoading={activeChecklistsLoading}
      activeTab={activeTab}
      checklistFilter={checklistFilter}
      createActive={createActive}
      createChecklistOpen={createChecklistOpen}
      data={data}
      deleteChecklist={deleteChecklist}
      deleteTemplate={deleteTemplate}
      loading={loading}
      selectedChecklist={selectedChecklist}
      // setChecklistSort={setChecklistSort}
      setActiveChecklistSort={setActiveChecklistSort}
      setChecklistFilters={setChecklistFilters}
      toggleCreateChecklistDrawer={toggleCreateChecklistDrawer}
    />
  );
};

export default Checklists;
