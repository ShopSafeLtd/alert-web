import React from 'react';

import View from './PoliceOffenderSideList.view';
import usePoliceOffenderSideList from './usePoliceOffenderSideList';

interface Props {
  current?: string;
  to?: string;
}

const PoliceOffenderSideList = ({ current, to }: Props): JSX.Element => {
  const { data, fetchMoreScroll, loading } = usePoliceOffenderSideList();

  return (
    <View
      current={current}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      to={to}
    />
  );
};

export default PoliceOffenderSideList;
