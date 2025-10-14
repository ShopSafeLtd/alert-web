import type { TagData } from 'types/DataType';

import React from 'react';

import View from './AddTag.view';
import useAddTag from './useAddTag';

interface Props {
  data?: TagData;
  description?: string;
  onClose: () => void;
  saving?: boolean;
  update: (value: TagData) => void;
}

const AddTag = ({
  data,
  description,
  onClose,
  saving,
  update,
}: Props): JSX.Element => {
  const { onSubmit } = useAddTag({
    data,
    update,
  });

  return (
    <View
      description={description}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving || false}
    />
  );
};

export default AddTag;
