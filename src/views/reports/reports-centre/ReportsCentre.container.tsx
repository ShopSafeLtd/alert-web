import React from 'react';

import View from './ReportsCentre.view';
import useReportsCentres from './useReportsCentre';

const ReportsCentre = () => {
  const {
    createGroupOpen,
    createOpen,
    data,
    editGroupOpen,
    editOpen,
    loading,
    onDeleteReportGroup,
    onDeleteReportTemplate,
    search,
    setSearch,
    toggleCreateGroupOpen,
    toggleCreateOpen,
    toggleEditGroupOpen,
    toggleEditOpen,
  } = useReportsCentres();
  return (
    <View
      createGroupOpen={createGroupOpen}
      createOpen={createOpen}
      data={data}
      editGroupOpen={editGroupOpen}
      editOpen={editOpen}
      loading={loading}
      onDeleteReportGroup={onDeleteReportGroup}
      onDeleteReportTemplate={onDeleteReportTemplate}
      search={search}
      setSearch={setSearch}
      toggleCreateGroupOpen={toggleCreateGroupOpen}
      toggleCreateOpen={toggleCreateOpen}
      toggleEditGroupOpen={toggleEditGroupOpen}
      toggleEditOpen={toggleEditOpen}
    />
  );
};

export default ReportsCentre;
