import React from 'react';
import View from './DataAudit.view';
import useDataAudit from './useDataAudit';

const DataAudit = () => {
  const {
    data,
    loading,
    offenderId,
    setOffenderId,
    search,
    setSearch,
    toggleSortFilter,
    sortFilter,
  } = useDataAudit();

  return (
    <View
      loading={loading}
      data={data}
      offenderId={offenderId}
      setOffenderId={setOffenderId}
      search={search}
      setSearch={setSearch}
      toggleSortFilter={toggleSortFilter}
      sortFilter={sortFilter}
    />
  );
};

export default DataAudit;
