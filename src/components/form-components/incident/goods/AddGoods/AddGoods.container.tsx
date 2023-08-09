import React from 'react';
import type { GoodsData } from 'types/DataType';
import useAddGoods from './useAddGoods';
import View from './AddGoods.view';

interface Props {
  onClose: () => void;
  update: (value: GoodsData) => void;
}
const AddGoods = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, goodsTypesData, goodsMode } = useAddGoods({ update });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        goodsTypesData={goodsTypesData}
        goodsMode={goodsMode}
      />
    </div>
  );
};

export default AddGoods;
