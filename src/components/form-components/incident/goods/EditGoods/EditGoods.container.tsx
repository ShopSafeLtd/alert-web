import React from 'react';
import type { GoodsData } from 'types/DataType';
import useEditGoods from './useEditGoods';
import View from './EditGoods.view';

interface Props {
  data: GoodsData;
  onClose: () => void;
  update: (value: GoodsData) => void;
  saving: boolean;
}
const EditGoods = ({ onClose, update, data, saving }: Props): JSX.Element => {
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
        saving={saving || false}
      />
    </div>
  );
};

export default EditGoods;
