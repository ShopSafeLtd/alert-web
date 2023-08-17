import React from 'react';
import type { VehicleData } from 'types/DataType';
import View from './AddVehicleSimple.view';
import useAddVehicleSimple from './useAddVehicleSimple';
import type { ImageData } from '../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  saving?: boolean;
  images: ImageData[] | undefined;
  onImagesUploaded?: (values: StateImageData[]) => void;
}

const AddVehicle = ({
  onClose,
  update,
  saving,
  images,
  onImagesUploaded,
}: Props): JSX.Element => {
  const { onSubmit, form } = useAddVehicleSimple({
    update,
    onImagesUploaded,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      form={form}
      images={images}
    />
  );
};

export default AddVehicle;
