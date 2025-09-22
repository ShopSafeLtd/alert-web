import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import type { TagType } from 'graphql/types';

import React from 'react';

import View from './AddCrimeType.view';
import useAddCrimeType from './useAddCrimeType';

interface Props {
  onClose: () => void;
  type?: TagType;
  update: MutationUpdaterFn<CreateTagMutation>;
}

const AddCrimeType = ({ onClose, type, update }: Props): JSX.Element => {
  const {
    generatingDescription,
    onGenerateDescription,
    onSubmit,
    saving,
    schemeId,
    tags,
  } = useAddCrimeType({
    onClose,
    type,
    update,
  });

  return (
    <View
      generatingDescription={generatingDescription}
      onClose={onClose}
      onGenerateDescription={onGenerateDescription}
      onSubmit={onSubmit}
      saving={saving}
      schemeId={schemeId}
      tags={tags}
      type={type}
    />
  );
};

export default AddCrimeType;
