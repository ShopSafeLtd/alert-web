import React from 'react';
import useTargetedGoods from './useTargetedGoods';
import View from './TargetedGoods';

const TargetedGoodsContainer = () => {
  const { data, loading } = useTargetedGoods();
  return <View data={data} loading={loading} />;
};

export default TargetedGoodsContainer;
