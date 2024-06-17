import React from 'react';
import View from './ReportsCentre.view';
import useReportsCentres from './useReportsCentre';

const ReportsCentre = () => {
  const {
    loading,
    data,
    search,
    setSearch,
    onDeleteReportTemplate,
    toggleEditOpen,
    toggleCreateOpen,
    editOpen,
    createOpen,
  } = useReportsCentres();
  return (
    <View
      loading={loading}
      data={data}
      search={search}
      setSearch={setSearch}
      onDeleteReportTemplate={onDeleteReportTemplate}
      toggleEditOpen={toggleEditOpen}
      toggleCreateOpen={toggleCreateOpen}
      editOpen={editOpen}
      createOpen={createOpen}
    />
  );
};

export default ReportsCentre;
