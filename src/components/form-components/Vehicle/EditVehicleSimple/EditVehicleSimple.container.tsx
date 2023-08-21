import React from 'react';
import type { VehicleData } from 'types/DataType';
import View from './EditVehicleSimple.view';
import useEditVehicleSimple from './useEditVehicleSimple';
import type { ImageData } from '../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  editData: VehicleData | undefined | null;
  images?: ImageData[];
  onImagesUploaded?: (values: StateImageData[]) => void;
}

const EditVehicleSimple = ({
  onClose,
  update,
  editData,
  images,
  onImagesUploaded,
}: Props): JSX.Element => {
  const { onSubmit, saving, form } = useEditVehicleSimple({
    onClose,
    update,
    editData,
    onImagesUploaded,
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
