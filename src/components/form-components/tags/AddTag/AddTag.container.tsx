import React from 'react';
import type { TagData } from 'types/DataType';
import View from './AddTag.view';
import useAddTag from './useAddTag';

interface Props {
  onClose: () => void;
  update: (value: TagData) => void;
  saving?: boolean;
  description?: string;
  data?: TagData;
}

const AddTag = ({
  onClose,
  update,
  saving,
  description,
  data,
}: Props): JSX.Element => {
  const { onSubmit } = useAddTag({
    update,
    data,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving || false}
      description={description}
    />
  );
};

export default AddTag;
