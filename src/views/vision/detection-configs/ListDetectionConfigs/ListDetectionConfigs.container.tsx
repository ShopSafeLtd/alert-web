import React from 'react';

import ListDetectionConfigsView from './ListDetectionConfigs.view';
import useListDetectionConfigs from './useListDetectionConfigs';

const ListDetectionConfigsContainer = () => {
  const {
    data,
    loading,
    search,
    setSearch,
    totalCount,
    filterState,
    handleTableChange,
    setPage,
  } = useListDetectionConfigs();

  return (
    <ListDetectionConfigsView
      data={data}
      setPage={setPage}
      filterState={filterState}
      loading={loading}
      onSearchChange={setSearch}
      onTableChange={handleTableChange}
      search={search}
      totalCount={totalCount}
    />
  );
};

export default ListDetectionConfigsContainer;
