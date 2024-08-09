import React from 'react';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageData } from '../../ImageSelect/ImageSelect.view';
import type { AddVehicleData } from './useAddVehicleSimple';

import View from './AddVehicleSimple.view';
import useAddVehicleSimple from './useAddVehicleSimple';

interface Props {
  images?: ImageData[] | undefined;
  onClose: () => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  saving?: boolean;
  update: (value: AddVehicleData) => void;
}

const AddVehicle = ({
  images,
  onClose,
  onImagesUploaded,
  saving,
  update,
}: Props): JSX.Element => {
  const { form, onSubmit } = useAddVehicleSimple({
    onImagesUploaded,
    update,
  });

  return (
    <View
      form={form}
      images={images}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default AddVehicle;
