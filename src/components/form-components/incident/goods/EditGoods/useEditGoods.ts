import type { ListGoodsTypesQuery } from '#/graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { GoodsData } from 'types/DataType';

import { useListGoodsTypesQuery } from '#/graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { GoodsMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
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
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
      goodsTypeId: item.goodsTypeId,
      name:
        item.name ??
        goodsTypesData?.listGoodsTypes.goodsTypes.find(
          ({ id }) => id === item.goodsTypeId
        )?.name ??
        '',
      quantity: item.quantity,
      recoveredQuantity: item.recoveredQuantity,
      recoveredValue:
        goodsMode === GoodsMode.Specific
          ? (item.recoveredValue || 0) * (item.recoveredQuantity || 0)
          : item.recoveredValue || 0,
      sku: item.sku,
      stockItemId: item.stockItemId,
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
