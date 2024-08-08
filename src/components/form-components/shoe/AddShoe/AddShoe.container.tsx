import type { UpsertShoeMutation } from '#/views/singleShoe/graphql/mutations/__generated__/upsert-shoe.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';

import View from './AddShoe.view';
import useAddShoe from './useAddShoe';

interface Props {
  onClose: () => void;
  shoeId?: string;
  update: MutationUpdaterFn<UpsertShoeMutation>;
}

const AddShoe = ({ onClose, shoeId, update }: Props): JSX.Element => {
  const {
    currentStep,
    form,
    info,
    loading,
    onSearchStockItem,
    onSubmit,
    saving,
  } = useAddShoe({
    onClose,
    shoeId,
    update,
  });

  return (
    <View
      currentStep={currentStep}
      form={form}
      info={info}
      loading={loading}
      onClose={onClose}
      onSearchStockItem={onSearchStockItem}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default AddShoe;
