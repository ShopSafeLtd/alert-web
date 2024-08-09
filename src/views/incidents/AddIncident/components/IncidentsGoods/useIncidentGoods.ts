import type { FormInstance } from 'antd';
import type { StockItemValue } from 'components/form-components/StockItemSearch/StockItemSearch.view';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';

import { Form } from 'antd';
import { useListBusinessesDivisionQuery } from 'graphql/businesses/queries/__generated__/list-businesses-division.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';

import type { FormData } from '../../useAddIncident';

interface Return {
  division: string | undefined;
  goods: {
    goodsType?: string;
    name?: string;
    quantity?: number;
    recoveredQuantity?: number;
    recoveredValue?: number;
    sku?: string;
    stockItem?: string;
    value?: number;
  }[];
  goodsTypesData: ListGoodsTypesQuery | undefined;
  onAddItem: (data: StockItemValue) => void;
}

const useIncidentGoods = ({
  form,
}: {
  form: FormInstance<FormData>;
}): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

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
  const [division, setDivision] = useState<string | undefined>(undefined);
  const business = Form.useWatch('business', form);

  useEffect(() => {
    if (businessesData && business) {
      const fullBusiness = businessesData.listBusinesses.businesses.find(
        ({ id }) => id === business.value
      );
      if (fullBusiness?.division) setDivision(fullBusiness.division);
    }
  }, [business]);
  const goods = Form.useWatch('goods', form) || [];
  const onAddItem = (data: StockItemValue) => {
    form.setFieldsValue({
      goods: [
        ...goods,
        {
          name: data.name || '',
          quantity: undefined,
          recoveredQuantity: 0,
          sku: data.sku || '',
          stockItem: data.id,
          value: data.salesPriceLocal ?? data.costPriceLocal ?? 0,
        },
      ],
    });
  };

  return {
    division,
    goods,
    goodsTypesData,
    onAddItem,
  };
};

export default useIncidentGoods;
