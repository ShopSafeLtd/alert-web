import React from 'react';

import View from './OffenderSideList.view';
import useOffenderSideList from './useOffenderSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const OffenderSideList = ({ current, to }: Props): JSX.Element => {
  const { data, fetchMoreScroll, loading } = useOffenderSideList();

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

export default OffenderSideList;
