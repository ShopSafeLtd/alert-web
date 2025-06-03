import type { Currency } from 'graphql/types';
import type { GoodsData } from 'types/DataType';

import React from 'react';

import View from './AddGoods.view';
import useAddGoods from './useAddGoods';

interface Props {
  businessId?: string;
  currency?: Currency | null;
  onClose: () => void;
  update: (value: GoodsData) => void;
}
const AddGoods = ({ currency, onClose, update }: Props): JSX.Element => {
  const { goodsMode, goodsTypesData, onSubmit } = useAddGoods({ update });
  return (
    <div>
      <View
        currency={currency}
        goodsMode={goodsMode}
        goodsTypesData={goodsTypesData}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddGoods;
