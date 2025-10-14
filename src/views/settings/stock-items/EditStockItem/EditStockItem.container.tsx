import type { UpdateStockItemInput } from '#/graphql/types';
import type { StockItemsListQuery } from '#/views/settings/stock-items/ListStockItems/graphql/queries/__generated__/list-stock-items.generated';

import React from 'react';

import EditStockItemView from './EditStockItem.view';
import useEditStockItem from './useEditStockItem';

type StockItemFromList =
  StockItemsListQuery['stockItemsSearch']['stock'][number];

interface Props {
  onCancel: () => void;
  onSuccess?: () => void;
  stockItem: StockItemFromList | null;
}

const EditStockItemContainer = ({ onCancel, onSuccess, stockItem }: Props) => {
  const { form, handleSubmit, updating } = useEditStockItem({
    onSuccess,
    stockItem,
  });

  const handleFormSubmit = (values: UpdateStockItemInput) => {
    void handleSubmit(values);
  };

  return (
    <EditStockItemView
      form={form}
      onCancel={onCancel}
      onSubmit={handleFormSubmit}
      updating={updating}
    />
  );
};

export default EditStockItemContainer;
