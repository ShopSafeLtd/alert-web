import React from 'react';
import useListDashboards from './useDashboards';
import View from './ListDashboards.view';

const ListDashboards = () => {
  const {
    data,
    loading,
    deleteDashboard,
    addDashboard,
    updateDashboard,
    createDashboard,
    toggleEditDashboard,
    editDashboard,
    toggleCreateDashboard,
    rolesData,
    schemeId,
  } = useListDashboards();

  return (
    <View
      schemeId={schemeId}
      rolesData={rolesData}
      toggleEditDashboard={toggleEditDashboard}
      editDashboard={editDashboard}
      data={data}
      loading={loading}
      addDashboard={addDashboard}
      toggleCreateDashboard={toggleCreateDashboard}
      createDashboard={createDashboard}
      updateDashboard={updateDashboard}
      deleteDashboard={deleteDashboard}
    />
  );
};

export default ListDashboards;
