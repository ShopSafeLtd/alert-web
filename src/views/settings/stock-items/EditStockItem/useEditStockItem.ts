import type { UpdateStockItemInput } from '#/graphql/types';
import type { StockItemsListQuery } from '#/views/settings/stock-items/ListStockItems/graphql/queries/__generated__/list-stock-items.generated';

import { StockItemsListDocument } from '#/views/settings/stock-items/ListStockItems/graphql/queries/__generated__/list-stock-items.generated';
import { useUpdateStockItemMutation } from '#/views/settings/stock-items/graphql/mutations/__generated__/update-stock-item.generated';
import { Form, message } from 'antd';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

type StockItemFromList =
  StockItemsListQuery['stockItemsSearch']['stock'][number];

interface UseEditStockItemProps {
  onSuccess?: () => void;
  stockItem: StockItemFromList | null;
}

const useEditStockItem = ({ onSuccess, stockItem }: UseEditStockItemProps) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [updateStockItem, { loading: updating }] = useUpdateStockItemMutation({
    onCompleted: () => {
      void message.success(
        intl.formatMessage({
          defaultMessage: 'Stock item updated successfully',
        })
      );
      onSuccess?.();
    },
    onError: (error) => {
      void message.error(error.message);
    },
    refetchQueries: [{ query: StockItemsListDocument }],
  });

  useEffect(() => {
    if (stockItem) {
      form.setFieldsValue({
        barcode: stockItem.barcode,
        brand: stockItem.brand,
        currency: stockItem.currency,
        division: stockItem.division,
        name: stockItem.name,
        salesPriceLocal: stockItem.salesPriceLocal,
        salesPriceStandard: stockItem.salesPriceStandard,
        sku: stockItem.sku,
        variant: stockItem.variant,
      });
    }
  }, [stockItem, form]);

  const handleSubmit = async (values: UpdateStockItemInput) => {
    if (!stockItem) return;

    await updateStockItem({
      variables: {
        data: values,
        where: { id: stockItem.id },
      },
    });
  };

  return {
    form,
    handleSubmit,
    updating,
  };
};

export default useEditStockItem;
