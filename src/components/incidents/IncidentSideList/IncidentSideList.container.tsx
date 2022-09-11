import React from 'react';
import View from './IncidentSideList.view';
import useIncidentSideList from './useIncidentSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
}

const IncidentSideList = ({ current }: Props): JSX.Element => {
  const { data, loading, onPaginationChange } = useIncidentSideList();

  return (
    <View
      data={data}
      loading={loading}
      current={current}
      onPaginationChange={onPaginationChange}
    />
  );
};

export default IncidentSideList;
