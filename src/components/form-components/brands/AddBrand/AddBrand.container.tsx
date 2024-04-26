import type { UpsertBrandMutation } from '#/graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import React from 'react';
import View from './AddBrand.view';
import useAddBrand from './useAddBrand';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<UpsertBrandMutation>;
}

const AddBrand = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, form, onSearchBusiness, saving } = useAddBrand({
    update,
    onClose,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      form={form}
      onSearchBusiness={onSearchBusiness}
    />
  );
};

export default AddBrand;
