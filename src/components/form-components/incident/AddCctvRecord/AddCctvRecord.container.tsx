import type { CctvRecordData } from 'types/DataType';

import React from 'react';

import View from './AddCctvRecord.view';
import useAddCctvRecord from './useAddCctvRecord';

interface Props {
  onClose: () => void;
  saving: boolean;
  update: (value: Omit<CctvRecordData, 'id'>) => void;
}

const AddCctvRecord = ({ onClose, saving, update }: Props): JSX.Element => {
  const { onSubmit } = useAddCctvRecord({ update });

  return (
    <div>
      <View onClose={onClose} onSubmit={onSubmit} saving={saving} />
    </div>
  );
};

export default AddCctvRecord;
