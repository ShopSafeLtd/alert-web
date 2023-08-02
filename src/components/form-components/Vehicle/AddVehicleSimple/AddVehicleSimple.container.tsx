import React from 'react';
import View from './AddVehicleSimple.view';
import type { AddVehicleData } from './useAddVehicleSimple';
import useAddVehicleSimple from './useAddVehicleSimple';
import type { ImageData } from '../../ImageSelect/ImageSelect.view';

interface Props {
  onClose: () => void;
  update: (value: AddVehicleData) => void;
  saving?: boolean;
  images: ImageData[];
}

const AddVehicle = ({
  onClose,
  update,
  saving,
  images,
}: Props): JSX.Element => {
  const { onSubmit, form } = useAddVehicleSimple({
    update,
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
