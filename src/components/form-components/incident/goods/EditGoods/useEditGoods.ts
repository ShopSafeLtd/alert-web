import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { GoodsData } from 'types/DataType';

import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';
import { useStoreState } from 'state';

interface Props {
  data: GoodsData;
  update: (value: GoodsData) => void;
}

interface Return {
  goodsMode: GoodsMode;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  onSubmit: (value: GoodsData) => void;
}

const useEditGoods = ({ data, update }: Props): Return => {
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

  const onSubmit = (item: GoodsData) => {
    update({
      ...data,
      goodsType: item.goodsType,
      name:
        item.name ??
        goodsTypesData?.listGoodsTypes.goodsTypes.find(
          ({ id }) => id === item.goodsType
        )?.name ??
        '',
      quantity: item.quantity,
      recoveredQuantity: item.recoveredQuantity,
      recoveredValue:
        goodsMode === GoodsMode.Specific
          ? (item.recoveredValue || 0) * (item.recoveredQuantity || 0)
          : item.recoveredValue || 0,
      sku: item.sku,
      // TODO fix
      stockItem: item.stockItem,
      value:
        goodsMode === GoodsMode.Specific
          ? (item.value || 0) * (item.quantity || 0)
          : item.value || 0,
    });
  };

  return {
    goodsMode,
    goodsTypesData,
    onSubmit,
  };
};

export default useEditGoods;
