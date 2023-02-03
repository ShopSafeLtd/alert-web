import React from 'react';
import View from './OffenderSideList.view';
import useOffenderSideList from './useOffenderSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const OffenderSideList = ({ current, to }: Props): JSX.Element => {
  const { data, loading, onPaginationChange } = useOffenderSideList();

  return (
    <View
      data={data}
      loading={loading}
      current={current}
      onPaginationChange={onPaginationChange}
      to={to}
    />
  );
};

export default OffenderSideList;
