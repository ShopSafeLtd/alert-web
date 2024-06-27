import React from 'react';
import type { GoodsData } from 'types/DataType';
import useAddGoods from './useAddGoods';
import View from './AddGoods.view';

interface Props {
  onClose: () => void;
  update: (value: GoodsData[]) => void;
  businessId?: string;
  saving: boolean;
}
const AddGoods = ({
  onClose,
  update,
  businessId,
  saving,
}: Props): JSX.Element => {
  const {
    onSubmit,
    goodsTypesData,
    goodsMode,
    goods,
    form,
    division,
    onAddItem,
  } = useAddGoods({ update, businessId });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        goodsTypesData={goodsTypesData}
        goodsMode={goodsMode}
        form={form}
        goods={goods}
        division={division}
        onAddItem={onAddItem}
        saving={saving}
      />
    </div>
  );
};

export default AddGoods;
