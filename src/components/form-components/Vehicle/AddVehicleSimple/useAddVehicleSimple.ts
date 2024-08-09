/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';

import { Form } from 'antd';
import { ImagePosition } from 'graphql/types';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../ImageSelect/ImageSelect.view';

export interface AddVehicleData {
  colour?: null | string | undefined;
  groupIds: string[];
  id: string;
  images?: ImageValue[];
  make?: null | string | undefined;
  model?: null | string | undefined;
  reference?: null | number;
  registration?: null | string | undefined;
}

interface Props {
  onImagesUploaded?: (values: StateImageData[]) => void;
  update: (value: AddVehicleData) => void;
}

export interface FormData {
  colour?: string;
  groupIds: string[];
  images?: ImageValue[];
  make?: string;
  model?: string;
  registration?: string;
}
interface Return {
  form: FormInstance<FormData>;
  onSubmit: (value: FormData) => void;
}

const useAddVehicleSimple = ({
  onImagesUploaded,
  update: updateVehicle,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();

  const onSubmit = (data: FormData) => {
    updateVehicle({
      colour: data.colour || '',
      groupIds: data.groupIds,
      id: Math.floor(Math.random() * 1000).toString(),
      images: data?.images?.map((item) => ({
        fileName: item.file?.response?.[0].blobName,
        id: item.id || `${Math.random()}`,
        new: !!item.file,
        policeImage: item.policeImage || false,
        position: item.position,
        primary: false,
        rotation: item.rotation,
        type: item.file?.response?.[0].mimetype,
        url: item.url || '',
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
              fileName: image.file?.response?.[0].blobName,
              policeImage: false,
              position: ImagePosition.CenterCenter,
              primary: false,
              rotation: 0,
              type: image.file?.response?.[0].mimetype,
              url: image.file?.response?.[0].url,
            }) as StateImageData
        )
      );
    }
  };

  return {
    form,
    onSubmit,
  };
};
export default useAddVehicleSimple;
