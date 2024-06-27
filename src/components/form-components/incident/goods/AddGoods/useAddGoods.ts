import { useStoreState } from 'state';
import type { GoodsData } from 'types/DataType';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/list-goods-types.generated';
import { GoodsMode } from 'graphql/types';
import { useListBusinessesDivisionQuery } from '#/graphql/businesses/queries/list-businesses-division.generated';
import { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { StockItemValue } from '#/components/form-components/StockItemSearch/StockItemSearch.view';

const { useForm } = Form;

interface Props {
  update: (value: GoodsData[]) => void;
  businessId?: string;
}
export interface FormData {
  goods: GoodsData[];
}

interface Return {
  onSubmit: (value: FormData) => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  goodsMode: GoodsMode;
  form: FormInstance<FormData>;
  goods?: GoodsData[];
  division: string | undefined;
  onAddItem: (data: StockItemValue) => void;
}

const useAddGoods = ({ update, businessId }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const goodsMode = useStoreState((state) => state.scheme.goodsMode);
  const [division, setDivision] = useState<string | undefined>(undefined);
  const [form] = useForm<FormData>();

  const goods = Form.useWatch('goods', form) || [];

  const { data: goodsTypesData } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: schemeId },
        },
      },
    },
  });
  const { data: businessesData } = useListBusinessesDivisionQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });
  useEffect(() => {
    if (businessesData && businessId) {
      const fullBusiness = businessesData.listBusinesses.businesses.find(
        ({ id }) => id === businessId
      );
      if (fullBusiness?.division) setDivision(fullBusiness.division);
    }
  }, [businessId]);

  const onAddItem = (data: StockItemValue) => {
    form.setFieldsValue({
      goods: [
        ...goods,
        {
          sku: data.sku || '',
          value: data.salesPriceLocal ?? data.costPriceLocal ?? 0,
          name: data.name || '',
          stockItem: data.id,
        },
      ],
    });
  };

  const onSubmit = (value: FormData) => {
    const filterGoods = value.goods
      .filter((item) => item.goodsType !== undefined || item.sku !== undefined)
      .map((item) => ({
        id: item.id || `${Math.random()}`,
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
      }));
    update(filterGoods);
  };

  return {
    onSubmit,
    goodsTypesData,
    goodsMode,
    goods,
    form,
    division,
    onAddItem,
  };
};

export default useAddGoods;
