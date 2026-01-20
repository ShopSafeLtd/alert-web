import React from 'react';

import ListDetectionConfigsView from './ListDetectionConfigs.view';
import useListDetectionConfigs from './useListDetectionConfigs';

const ListDetectionConfigsContainer = () => {
  const {
    data,
    filterState,
    handleTableChange,
    loading,
    search,
    setPage,
    setSearch,
    totalCount,
  } = useListDetectionConfigs();

  return (
    <ListDetectionConfigsView
      data={data}
      filterState={filterState}
      loading={loading}
      onSearchChange={setSearch}
      onTableChange={handleTableChange}
      search={search}
      setPage={setPage}
      totalCount={totalCount}
    />
  );
};

export default ListDetectionConfigsContainer;
