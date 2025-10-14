/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import type { VehicleData } from 'types/DataType';

import { Form } from 'antd';
import { ImagePosition } from 'graphql/types';
import { useState } from 'react';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../ImageSelect/ImageSelect.view';

export interface UpdateVehicleData {
  colour?: null | string | undefined;
  id: string;
  images?: {
    id: string;
    optimised?: null | string;
  }[];
  make?: null | string | undefined;
  model?: null | string | undefined;
  reference?: null | number;
  registration?: null | string | undefined;
}

interface Props {
  editData: VehicleData | null | undefined;
  onClose: () => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  update: (value: UpdateVehicleData) => void;
}

export interface FormData {
  colour?: string;
  images: ImageValue[];
  make?: string;
  model?: string;
  registration: string;
}

interface Return {
  form: FormInstance<FormData>;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useEditVehicleSimple = ({
  editData,
  onClose,
  onImagesUploaded,
  update: updateVehicle,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const [saving, setSaving] = useState(false);

  const onSubmit = (data: FormData) => {
    setSaving(true);

    updateVehicle({
      colour: data.colour || '',
      id: editData?.id || '',
      images: data?.images?.map((item) => ({
        fileName: item.file?.response && item.file.response[0].blobName,
        id: item.id || '',
        new: !!item.file,
        optimised: item.optimised,
        policeImage: item.policeImage || false,
        position: item.position,
        primary: false,
        rotation: item.rotation,
        type: item.file?.response && item.file.response[0].mimetype,
        url: item.url,
      })),
      make: data.make || '',
      model: data.model || '',
      registration: data.registration || '',
    });

    const uploadedImages = data.images?.filter((image) => image.file) || [];
    if (uploadedImages.length > 0 && onImagesUploaded) {
      onImagesUploaded(
        uploadedImages.map(
          (image) =>
            ({
              ...image.file,
              fileName: image.file?.response && image.file.response[0].blobName,
              policeImage: false,
              position: ImagePosition.CenterCenter,
              primary: false,
              rotation: 0,
              type: image.file?.response && image.file.response[0].mimetype,
              url: image.file?.response && image.file.response[0].url,
            } as StateImageData)
        )
      );
    }

    onClose();
  };
  // image

  return {
    form,
    onSubmit,
    saving,
  };
};
export default useEditVehicleSimple;
