import type { VehicleData } from 'types/DataType';

import React from 'react';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageData } from '../../ImageSelect/ImageSelect.view';

import View from './EditVehicleSimple.view';
import useEditVehicleSimple from './useEditVehicleSimple';

interface Props {
  editData: VehicleData | null | undefined;
  images?: ImageData[];
  onClose: () => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  update: (value: VehicleData) => void;
}

const EditVehicleSimple = ({
  editData,
  images,
  onClose,
  onImagesUploaded,
  update,
}: Props): JSX.Element => {
  const { form, onSubmit, saving } = useEditVehicleSimple({
    editData,
    onClose,
    onImagesUploaded,
    update,
  });

  return (
    <View
      editData={editData}
      form={form}
      images={images}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default EditVehicleSimple;
