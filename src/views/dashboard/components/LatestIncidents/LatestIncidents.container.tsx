import React from 'react';
import View from './LatestIncidents.view';
import useLatestIncidents from './useLatestIncidents';

const LatestIncidents = (): JSX.Element => {
  const { data, loading, fetchMoreScroll } = useLatestIncidents();

  return (
    <View data={data} loading={loading} fetchMoreScroll={fetchMoreScroll} />
  );
};

export default LatestIncidents;
