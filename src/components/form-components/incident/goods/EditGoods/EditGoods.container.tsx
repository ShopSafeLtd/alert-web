import type { Currency } from 'graphql/types';
import type { GoodsData } from 'types/DataType';

import React from 'react';

import View from './EditGoods.view';
import useEditGoods from './useEditGoods';

interface Props {
  currency?: Currency | null;
  data: GoodsData;
  onClose: () => void;
  saving: boolean;
  update: (value: GoodsData) => void;
}
const EditGoods = ({
  currency,
  data,
  onClose,
  saving,
  update,
}: Props): JSX.Element => {
  const { goodsMode, goodsTypesData, onSubmit } = useEditGoods({
    data,
    update,
  });

  return (
    <div>
      <View
        currency={currency}
        data={data}
        goodsMode={goodsMode}
        goodsTypesData={goodsTypesData}
        onClose={onClose}
        onSubmit={onSubmit}
        saving={saving || false}
      />
    </div>
  );
};

export default EditGoods;
