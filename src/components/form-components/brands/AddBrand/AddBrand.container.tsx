import type { UpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/__generated__/upsert-brand.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';

import View from './AddBrand.view';
import useAddBrand from './useAddBrand';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<UpsertBrandMutation>;
}

const AddBrand = ({ onClose, update }: Props): JSX.Element => {
  const { form, onSubmit, saving } = useAddBrand({
    onClose,
    update,
  });

  return (
    <View form={form} onClose={onClose} onSubmit={onSubmit} saving={saving} />
  );
};

export default AddBrand;
