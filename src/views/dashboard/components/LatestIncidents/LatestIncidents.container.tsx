import React from 'react';

import View from './LatestIncidents.view';
import useLatestIncidents from './useLatestIncidents';

const LatestIncidents = (): JSX.Element => {
  const { data, fetchMoreScroll, loading } = useLatestIncidents();

  return (
    <View data={data} fetchMoreScroll={fetchMoreScroll} loading={loading} />
  );
};

export default LatestIncidents;
