/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { VehicleData } from 'types/DataType';
import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../ImageSelect/ImageSelect.view';
import { ImagePosition } from 'graphql/types';

export interface UpdateVehicleData {
  id: string;
  make?: string | null | undefined;
  model?: string | null | undefined;
  colour?: string | null | undefined;
  reference?: number | null;
  registration?: string | null | undefined;
  images?: {
    id: string;
    optimised?: string | null;
  }[];
}

interface Props {
  onClose: () => void;
  update: (value: UpdateVehicleData) => void;
  editData: VehicleData | undefined | null;
  onImagesUploaded?: (values: StateImageData[]) => void;
}

export interface FormData {
  registration: string;
  make?: string;
  model?: string;
  colour?: string;
  images: ImageValue[];
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
}

const useEditVehicleSimple = ({
  onClose,
  update: updateVehicle,
  editData,
  onImagesUploaded,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const [saving, setSaving] = useState(false);

  const onSubmit = (data: FormData) => {
    setSaving(true);

    updateVehicle({
      id: editData?.id || '',
      make: data.make || '',
      model: data.model || '',
      colour: data.colour || '',
      registration: data.registration || '',
      images: data?.images?.map((item) => ({
        id: item.id || '',
        url: item.url,
        optimised: item.optimised,
        fileName: item.file?.response && item.file.response[0].blobName,
        type: item.file?.response && item.file.response[0].mimetype,
        position: item.position,
        primary: false,
        policeImage: item.policeImage || false,
        rotation: item.rotation,
        new: !!item.file,
      })),
    });

    const uploadedImages = data.images?.filter((image) => image.file) || [];
    if (uploadedImages.length > 0 && onImagesUploaded) {
      onImagesUploaded(
        uploadedImages.map(
          (image) =>
            ({
              ...image.file,
              url: image.file?.response && image.file.response[0].url,
              fileName: image.file?.response && image.file.response[0].blobName,
              type: image.file?.response && image.file.response[0].mimetype,
              policeImage: false,
              primary: false,
              rotation: 0,
              position: ImagePosition.CenterCenter,
            } as StateImageData)
        )
      );
    }

    onClose();
  };
  // image

  return {
    onSubmit,
    form,
    saving,
  };
};
export default useEditVehicleSimple;
