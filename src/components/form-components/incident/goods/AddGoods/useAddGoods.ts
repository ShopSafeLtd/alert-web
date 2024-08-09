import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { GoodsMode } from 'graphql/types';
import type { GoodsData } from 'types/DataType';

import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { useStoreState } from 'state';

interface Props {
  update: (value: GoodsData) => void;
}

interface Return {
  goodsMode: GoodsMode;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  onSubmit: (value: GoodsData) => void;
}

const useAddGoods = ({ update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const goodsMode = useStoreState((state) => state.scheme.goodsMode);
  const { data: goodsTypesData } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: schemeId },
        },
      },
    },
  });

  const onSubmit = (value: GoodsData) => {
    update({
      goodsTypeId: value.goodsTypeId,
      id: `${Math.random()}`,
      name:
        value.name ??
        goodsTypesData?.listGoodsTypes.goodsTypes.find(
          ({ id }) => id === value.goodsTypeId
        )?.name ??
        '',
      quantity: value.quantity,
      recoveredQuantity: value.recoveredQuantity,
      recoveredValue: value.recoveredValue ?? 0,
      sku: value.sku,
      stockItemId: value.stockItemId,
      value: value.value ?? 0,
    });
  };

  return {
    goodsMode,
    goodsTypesData,
    onSubmit,
  };
};

export default useAddGoods;
