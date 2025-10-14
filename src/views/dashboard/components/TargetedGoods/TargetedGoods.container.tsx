import React from 'react';

import View from './TargetedGoods';
import useTargetedGoods from './useTargetedGoods';

const TargetedGoodsContainer = () => {
  const { data, loading } = useTargetedGoods();
  return <View data={data} loading={loading} />;
};

export default TargetedGoodsContainer;
