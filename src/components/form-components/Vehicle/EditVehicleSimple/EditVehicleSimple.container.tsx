import React from 'react';
import View from './EditVehicleSimple.view';
import type { UpdateVehicleData } from './useEditVehicleSimple';
import useEditVehicleSimple from './useEditVehicleSimple';
import type { ImageData } from '../../ImageSelect/ImageSelect.view';

interface Props {
  onClose: () => void;
  update: (value: UpdateVehicleData) => void;
  editData: UpdateVehicleData | undefined | null;
  images?: ImageData[];
}

const EditVehicleSimple = ({
  onClose,
  update,
  editData,
  images,
}: Props): JSX.Element => {
  const { onSubmit, saving, form } = useEditVehicleSimple({
    onClose,
    update,
    editData,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      form={form}
      editData={editData}
      images={images}
    />
  );
};

export default EditVehicleSimple;
