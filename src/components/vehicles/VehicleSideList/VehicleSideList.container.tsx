import React from 'react';
import View from './VehicleSideList.view';
import useVehicleSideList from './useVehicleSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const VehicleSideList = ({ current, to }: Props): JSX.Element => {
  const { data, loading, onPaginationChange, pagination } =
    useVehicleSideList();

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

export default VehicleSideList;
