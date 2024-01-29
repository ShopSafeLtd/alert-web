import React from 'react';
import View from './Checklists.view';
import useChecklists from './useChecklists';

const Checklists = (): JSX.Element => {
  const {
    data,
    loading,
    activeChecklistsData,
    activeChecklistsLoading,
    createActive,
    activeTab,
    checklistFilter,
    setChecklistFilters,
    createChecklistOpen,
    toggleCreateChecklistDrawer,
    selectedChecklist,
    checklistSort,
    activeChecklistSort,
    setChecklistSort,
    setActiveChecklistSort,
    deleteTemplate,
  } = useChecklists();

  return (
    <View
      checklistSort={checklistSort}
      activeChecklistSort={activeChecklistSort}
      setChecklistSort={setChecklistSort}
      setActiveChecklistSort={setActiveChecklistSort}
      selectedChecklist={selectedChecklist}
      createChecklistOpen={createChecklistOpen}
      toggleCreateChecklistDrawer={toggleCreateChecklistDrawer}
      activeTab={activeTab}
      createActive={createActive}
      data={data}
      loading={loading}
      activeChecklistsData={activeChecklistsData}
      activeChecklistsLoading={activeChecklistsLoading}
      checklistFilter={checklistFilter}
      setChecklistFilters={setChecklistFilters}
      deleteTemplate={deleteTemplate}
    />
  );
};

export default Checklists;
