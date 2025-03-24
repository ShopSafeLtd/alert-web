import type { TagData } from 'types/DataType';

import React from 'react';

import View from './AddOffenderWarning.view';
import useAddOffenderWarning from './useAddOffenderWarning';

interface Props {
  onClose: () => void;
  saving?: boolean;
  update: (value: TagData) => void;
}

const AddOffenderWarning = ({
  onClose,
  saving,
  update,
}: Props): JSX.Element => {
  const { onSubmit, schemeId, userSchemes } = useAddOffenderWarning({
    update,
  });

  return (
    <View
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving || false}
      schemeId={schemeId}
      userSchemes={userSchemes}
    />
  );
};

export default AddOffenderWarning;
