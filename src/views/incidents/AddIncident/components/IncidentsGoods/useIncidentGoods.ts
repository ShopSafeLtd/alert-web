import type { ListGoodsTypesQuery } from '../../../../../graphql/generated';
import { useListGoodsTypesQuery } from '../../../../../graphql/generated';

interface Return {
  goodsTypesData: ListGoodsTypesQuery | undefined;
}

const useIncidentGoods = (): Return => {
  const { data: goodsTypesData } = useListGoodsTypesQuery();

  return {
    goodsTypesData,
  };
};

export default useIncidentGoods;
