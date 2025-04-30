import type { FormInstance } from 'antd';
import type { StockItemValue } from 'components/form-components/StockItemSearch/StockItemSearch.view';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Form } from 'antd';
import { useListBusinessesDivisionQuery } from 'graphql/businesses/queries/__generated__/list-businesses-division.generated';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

import type { FormData } from '../AddStockRemovalRequest/AddStockRemovalRequest.view';

interface Return {
  division: string | undefined;
  items: {
    goodsType?: string;
    name?: string;
    quantity?: number;
    recoveredQuantity?: number;
    recoveredValue?: number;
    sku?: string;
    stockItem?: string;
    value?: number;
  }[];
  onAddItem: (data: StockItemValue) => void;
}

const useStockRemovalGoods = ({
  form,
}: {
  form: FormInstance<FormData>;
}): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

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
  const businessId = Form.useWatch('businessId', form);

  useEffect(() => {
    if (businessesData && businessId) {
      const fullBusiness = businessesData.listBusinesses.businesses.find(
        ({ id }) => id === businessId[0]
      );
      if (fullBusiness?.division) setDivision(fullBusiness.division);
    }
  }, [businessId]);
  const items = Form.useWatch('items', form) || [];
  const onAddItem = (data: StockItemValue) => {
    form.setFieldsValue({
      items: [
        ...items,
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
    items,
    onAddItem,
  };
};

export default useStockRemovalGoods;
