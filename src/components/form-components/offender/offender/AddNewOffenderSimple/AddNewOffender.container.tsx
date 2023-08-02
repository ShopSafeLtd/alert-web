import React from 'react';
import type { OffenderData } from 'types/DataType';
import useAddNewOffender from './useAddNewOffender';
import View from './AddNewOffender.view';
import type { ImageData } from '../../../ImageSelect/ImageSelect.view';

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
  images: ImageData[] | undefined;
}
const AddNewOffender = ({ onClose, update, images }: Props): JSX.Element => {
  const { onSubmit, saving, ageCheck, idVerified, form } = useAddNewOffender({
    onClose,
    update,
  });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        images={images}
        idVerified={idVerified}
        ageCheck={ageCheck}
        form={form}
      />
    </div>
  );
};

export default AddNewOffender;
