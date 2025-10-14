import React from 'react';

import View from './VehicleSideList.view';
import useVehicleSideList from './useVehicleSideList';

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const VehicleSideList = ({ current, to }: Props): JSX.Element => {
  const { data, loading, next } = useVehicleSideList();

  return (
    <View current={current} data={data} loading={loading} next={next} to={to} />
  );
};

export default VehicleSideList;
