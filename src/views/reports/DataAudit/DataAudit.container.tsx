import React from 'react';

import View from './DataAudit.view';
import useDataAudit from './useDataAudit';

const DataAudit = () => {
  const {
    data,
    loading,
    offenderId,
    search,
    setOffenderId,
    setSearch,
    sortFilter,
    toggleSortFilter,
  } = useDataAudit();

  return (
    <View
      data={data}
      loading={loading}
      offenderId={offenderId}
      search={search}
      setOffenderId={setOffenderId}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
    />
  );
};

export default DataAudit;
