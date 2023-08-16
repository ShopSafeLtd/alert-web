/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { ImagePosition } from '../../../../graphql/generated';
import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../ImageSelect/ImageSelect.view';

export interface AddVehicleData {
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
  update: (value: AddVehicleData) => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
}

export interface FormData {
  make?: string;
  model?: string;
  colour?: string;
  registration?: string;
  images?: ImageValue[];
}
interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
}

const useAddVehicleSimple = ({
  update: updateVehicle,
  onImagesUploaded,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();

  const onSubmit = (data: FormData) => {
    updateVehicle({
      id: Math.floor(Math.random() * 1000).toString(),
      make: data.make || '',
      model: data.model || '',
      colour: data.colour || '',
      registration: data.registration || '',
      images: data?.images?.map((item) => ({
        id: item.id || `${Math.random()}`,
        fileName: item.file?.response && item.file.response[0].blobName,
        type: item.file?.response && item.file.response[0].mimetype,
        url: item.url || '',
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
  };

  return {
    onSubmit,
    form,
  };
};
export default useAddVehicleSimple;
