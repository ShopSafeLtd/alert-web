import type { ListGoodsTypesQuery } from 'graphql/generated';
import {
  useListBusinessesDivisionQuery,
  useListGoodsTypesQuery,
} from 'graphql/generated';
import type { StockItemValue } from 'components/form-components/StockItemSearch/StockItemSearch.view';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useStoreState } from 'state';
import { useEffect, useState } from 'react';
import type { FormData } from '../../useAddIncident';

interface Return {
  goodsTypesData: ListGoodsTypesQuery | undefined;
  onAddItem: (data: StockItemValue) => void;
  division: string | undefined;
  goods: {
    goodsType?: string;
    value?: number;
    recoveredValue?: number;
    quantity?: number;
    recoveredQuantity?: number;
    sku?: string;
    name?: string;
    stockItem?: string;
  }[];
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
          sku: data.sku || '',
          value: data.salesPriceLocal ?? data.costPriceLocal ?? 0,
          quantity: undefined,
          recoveredQuantity: 0,
          name: data.name || '',
          stockItem: data.id,
        },
      ],
    });
  };

  return {
    goodsTypesData,
    onAddItem,
    division,
    goods,
  };
};

export default useIncidentGoods;
