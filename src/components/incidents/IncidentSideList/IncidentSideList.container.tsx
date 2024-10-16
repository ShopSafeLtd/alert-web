import React from 'react';

import View from './IncidentSideList.view';
import useIncidentSideList from './useIncidentSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
}

const IncidentSideList = ({ current }: Props): JSX.Element => {
  const { data, loading, next } = useIncidentSideList();

  return (
    <View
      current={current}
      data={data}
      loading={loading}
      // onPaginationChange={onPaginationChange}
      // pagination={pagination}
      next={next}
    />
  );
};

export default IncidentSideList;
