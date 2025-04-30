import type { FormInstance } from 'antd';

import React from 'react';

import type { FormData } from '../AddStockRemovalRequest/AddStockRemovalRequest.view';

import View from './StockRemovalGoods.view';
import useStockRemovalGoods from './useStockRemovalGoods';

interface Props {
  form: FormInstance<FormData>;
}

const StockRemovalGoods = ({ form }: Props) => {
  const { division, items, onAddItem } = useStockRemovalGoods({
    form,
  });
  return <View division={division} goods={items} onAddItem={onAddItem} />;
};

export default StockRemovalGoods;
