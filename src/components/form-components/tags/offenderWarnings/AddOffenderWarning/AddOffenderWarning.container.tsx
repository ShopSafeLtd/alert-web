import React from 'react';
import type { TagData } from 'types/DataType';
import View from './AddOffenderWarning.view';
import useAddOffenderWarning from './useAddOffenderWarning';

interface Props {
  onClose: () => void;
  update: (value: TagData) => void;
  saving?: boolean;
}

const AddOffenderWarning = ({
  onClose,
  update,
  saving,
}: Props): JSX.Element => {
  const { onSubmit, userSchemes, schemeId } = useAddOffenderWarning({
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving || false}
      userSchemes={userSchemes}
      schemeId={schemeId}
    />
  );
};

export default AddOffenderWarning;
