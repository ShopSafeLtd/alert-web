import { useStoreState } from 'state';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';

interface Props {
  update: (value: GoodsData) => void;
  data: GoodsData;
}

interface Return {
  onSubmit: (value: GoodsData) => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: GoodsMode;
}

const useEditGoods = ({ update, data }: Props): Return => {
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
        (goodsTypesData &&
          goodsTypesData.listGoodsTypes.goodsTypes.find(
            ({ id }) => id === item.goodsType
          )?.name) ??
        '',
      value:
        goodsMode === GoodsMode.Specific
          ? (item.value || 0) * (item.quantity || 0)
          : item.value || 0,
      recoveredValue:
        goodsMode === GoodsMode.Specific
          ? (item.recoveredValue || 0) * (item.recoveredQuantity || 0)
          : item.recoveredValue || 0,
      sku: item.sku,
      quantity: item.quantity,
      recoveredQuantity: item.recoveredQuantity,
      stockItem: item.stockItem,
    });
  };

  return {
    onSubmit,
    goodsTypesData,
    goodsMode,
  };
};

export default useEditGoods;
