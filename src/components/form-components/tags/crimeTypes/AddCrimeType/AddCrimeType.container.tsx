import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';

import View from './AddCrimeType.view';
import useAddCrimeType from './useAddCrimeType';

import type { TagType } from 'graphql/types';
import { CreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateTagMutation>;
  type?: TagType;
}

const AddCrimeType = ({ onClose, update, type }: Props): JSX.Element => {
  const { onSubmit, saving, schemeId, userSchemes, tags } = useAddCrimeType({
    onClose,
    update,
    type,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      type={type}
      schemeId={schemeId}
      userSchemes={userSchemes}
      tags={tags}
    />
  );
};

export default AddCrimeType;
