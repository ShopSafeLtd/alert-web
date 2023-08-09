import type { GoodsMode, ListGoodsTypesQuery } from 'graphql/generated';
import { useListGoodsTypesQuery } from 'graphql/generated';
import { useStoreState } from 'state';
import type { GoodsData } from 'types/DataType';

interface Props {
  update: (value: GoodsData) => void;
}

interface Return {
  onSubmit: (value: GoodsData) => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: GoodsMode;
}

const useAddGoods = ({ update }: Props): Return => {
  const goodsMode = useStoreState((state) => state.scheme.goodsMode);
  const { data: goodsTypesData } = useListGoodsTypesQuery();

  const onSubmit = (value: GoodsData) => {
    update({
      id: `${Math.random()}`,
      goodsTypeId: value.goodsTypeId,
      name:
        goodsTypesData?.listGoodsTypes.goodsTypes.find(
          ({ id }) => id === value.goodsTypeId
        )?.name || '',
      value: value.value || 0,
      recoveredValue: value.recoveredValue || 0,
    });
  };

  return {
    onSubmit,
    goodsTypesData,
    goodsMode,
  };
};

export default useAddGoods;
