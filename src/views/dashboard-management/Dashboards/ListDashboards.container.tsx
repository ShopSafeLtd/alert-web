import React from 'react';

import View from './ListDashboards.view';
import useListDashboards from './useDashboards';

const ListDashboards = () => {
  const {
    addDashboard,
    createDashboard,
    data,
    deleteDashboard,
    editDashboard,
    loading,
    rolesData,
    schemeId,
    toggleCreateDashboard,
    toggleEditDashboard,
    updateDashboard,
  } = useListDashboards();

  return (
    <View
      addDashboard={addDashboard}
      createDashboard={createDashboard}
      data={data}
      deleteDashboard={deleteDashboard}
      editDashboard={editDashboard}
      loading={loading}
      rolesData={rolesData}
      schemeId={schemeId}
      toggleCreateDashboard={toggleCreateDashboard}
      toggleEditDashboard={toggleEditDashboard}
      updateDashboard={updateDashboard}
    />
  );
};

export default ListDashboards;
