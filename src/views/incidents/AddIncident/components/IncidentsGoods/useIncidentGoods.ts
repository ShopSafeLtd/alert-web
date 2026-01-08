import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';
import type { StockItemValue } from 'components/form-components/StockItemSearch/StockItemSearch.view';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { Currency } from 'graphql/types';

import {
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { Form } from 'antd';
import { useListBusinessesDivisionQuery } from 'graphql/businesses/queries/__generated__/list-businesses-division.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { useAtomValue } from 'jotai/index';
import { useEffect, useMemo, useState } from 'react';

interface Return {
  businessCurrency?: Currency | null;
  division: string | undefined;
  goods: {
    barcode?: string;
    damagedQuantity?: number;
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
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userBusinesses = useAtomValue(currentSchemeBusinessesAtom);

  const { data: goodsTypesData } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: schemeId },
        },
      },
    },
  });
  const business = Form.useWatch('business', form);

  const businessId = useMemo(() => {
    if (userBusinesses.length === 1) return userBusinesses[0].id;
    return business?.value;
  }, [business, userBusinesses]);

  const { data: businessesData } = useListBusinessesDivisionQuery({
    variables: {
      where: {
        id: businessId ? { equals: businessId } : undefined,
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
  const [businessCurrency, setBusinessCurrency] = useState<Currency | null>();
  useEffect(() => {
    if (businessesData) {
      const fullBusiness = businessesData.listBusinesses.businesses.find(
        ({ id }) => id === (business ? business.value : userBusinesses[0]?.id)
      );
      // Always set the values, even if undefined/null to clear previous values
      setDivision(fullBusiness?.division || undefined);
      setBusinessCurrency(fullBusiness?.currency || null);
    } else {
      // Clear values when no business is selected
      setDivision(undefined);
      setBusinessCurrency(null);
    }
  }, [business, businessesData, userBusinesses]);
  const goods = Form.useWatch('goods', form) || [];
  const onAddItem = (data: StockItemValue) => {
    form.setFieldsValue({
      goods: [
        ...goods,
        {
          barcode: data.barcode || '',
          damagedQuantity: 0,
          name: data.name || '',
          quantity: undefined,
          recoveredQuantity: 0,
          sku: data.sku || '',
          stockItem: data.id,
          value: data.salesPriceLocal ?? data.costPriceLocal ?? 0,
          variant: data.variant,
        },
      ],
    });
  };

  return {
    businessCurrency,
    division,
    goods,
    goodsTypesData,
    onAddItem,
  };
};

export default useIncidentGoods;
