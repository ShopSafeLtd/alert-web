import React from 'react';
import type { OffenderData } from 'types/DataType';
import useAddNewOffender from './useAddNewOffender';
import View from './AddNewOffender.view';
import type { ImageData } from '../../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
  images: ImageData[] | undefined;
  onImagesUploaded?: (values: StateImageData[]) => void;
}
const AddNewOffender = ({
  onClose,
  update,
  images,
  onImagesUploaded,
}: Props): JSX.Element => {
  const { onSubmit, saving, ageCheck, idVerified, form } = useAddNewOffender({
    onClose,
    update,
    onImagesUploaded,
  });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        images={images}
        form={form}
        idVerified={idVerified}
        ageCheck={ageCheck}
      />
    </div>
  );
};

export default AddNewOffender;
