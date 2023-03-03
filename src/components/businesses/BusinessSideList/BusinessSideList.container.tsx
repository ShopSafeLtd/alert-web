import React from 'react';
import View from './BusinessSideList.view';
import useBusinessSideList from './useBusinessSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const BusinessSideList = ({ current, to }: Props): JSX.Element => {
  const { data, loading, onPaginationChange, pagination } =
    useBusinessSideList();

  return (
    <View
      data={data}
      loading={loading}
      current={current}
      onPaginationChange={onPaginationChange}
      to={to}
      pagination={pagination}
    />
  );
};

export default BusinessSideList;
