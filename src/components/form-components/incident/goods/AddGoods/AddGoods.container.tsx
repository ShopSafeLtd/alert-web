import type { GoodsData } from 'types/DataType';

import React from 'react';

import View from './AddGoods.view';
import useAddGoods from './useAddGoods';

interface Props {
  businessId?: string;
  onClose: () => void;
  saving: boolean;
  update: (value: GoodsData) => void;
}
const AddGoods = ({ onClose, update }: Props): JSX.Element => {
  const { goodsMode, goodsTypesData, onSubmit } = useAddGoods({ update });
  return (
    <div>
      <View
        goodsMode={goodsMode}
        goodsTypesData={goodsTypesData}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddGoods;
