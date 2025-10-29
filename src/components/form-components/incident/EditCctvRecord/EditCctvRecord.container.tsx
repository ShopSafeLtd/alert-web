import type { CctvRecordData } from 'types/DataType';

import React from 'react';

import View from './EditCctvRecord.view';
import useEditCctvRecord from './useEditCctvRecord';
interface Props {
  data: CctvRecordData;
  onClose: () => void;
  saving: boolean;
  update: (value: CctvRecordData) => void;
}
const EditCctvRecord = ({
  data,
  onClose,
  saving,
  update,
}: Props): JSX.Element => {
  const { onSubmit } = useEditCctvRecord({
    data,
    update,
  });

  return (
    <div>
      <View
        data={data}
        onClose={onClose}
        onSubmit={onSubmit}
        saving={saving || false}
      />
    </div>
  );
};

export default EditCctvRecord;
