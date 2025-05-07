import React from 'react';

import View from './DraftIncidents.view';
import useDraftIncidents from './useDraftIncidents';

const DraftIncidents = (): JSX.Element => {
  const { data, fetchMoreScroll, loading } = useDraftIncidents();

  return (
    <View data={data} fetchMoreScroll={fetchMoreScroll} loading={loading} />
  );
};

export default DraftIncidents;
