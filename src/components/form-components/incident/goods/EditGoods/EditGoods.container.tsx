import React from 'react';
import type { GoodsData } from 'types/DataType';
import useEditGoods from './useEditGoods';
import View from './EditGoods.view';

interface Props {
  data: GoodsData;
  onClose: () => void;
  update: (value: GoodsData) => void;
}
const EditGoods = ({ onClose, update, data }: Props): JSX.Element => {
  const { onSubmit, goodsTypesData, goodsMode } = useEditGoods({
    update,
    data,
  });
  return (
    <div>
      <View
        data={data}
        onSubmit={onSubmit}
        onClose={onClose}
        goodsTypesData={goodsTypesData}
        goodsMode={goodsMode}
      />
    </div>
  );
};

export default EditGoods;
