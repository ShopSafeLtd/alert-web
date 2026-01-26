import React from 'react';

import PoliceCrimeGroupFeed from './PoliceCrimeGroupFeed.view';
import usePoliceCrimeGroupFeed from './usePoliceCrimeGroupFeed';

const PoliceCrimeGroupFeedContainer = (): JSX.Element => {
  const {
    compactView,
    data,
    fetchMoreScroll,
    loading,
    search,
    setCompactView,
    setSearch,
    setTableView,
    tableView,
  } = usePoliceCrimeGroupFeed();

  return (
    <PoliceCrimeGroupFeed
      compactView={compactView}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      search={search}
      setCompactView={setCompactView}
      setSearch={setSearch}
      setTableView={setTableView}
      tableView={tableView}
    />
  );
};

export default PoliceCrimeGroupFeedContainer;
