import React from 'react';
import View from './OffenderSideList.view';
import useOffenderSideList from './useOffenderSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
}

const OffenderSideList = ({ current }: Props): JSX.Element => {
  const { data, loading, onPaginationChange } = useOffenderSideList();

  return (
    <View
      data={data}
      loading={loading}
      current={current}
      onPaginationChange={onPaginationChange}
    />
  );
};

export default OffenderSideList;
