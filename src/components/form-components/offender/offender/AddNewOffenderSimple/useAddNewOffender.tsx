/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import type {
  Age,
  Build,
  Gender,
  Height,
  IdSource,
  Race,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { ImagePosition } from 'graphql/generated';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../../ImageSelect/ImageSelect.view';

export interface AddOffenderData {
  id: string;
  reference?: number | null;
  alias?: string[] | null;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  height?: Height | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  comment?: string | null;
  idVerified?: boolean;
  idSource?: IdSource;
  images?: {
    id: string;
    url?: string | null | undefined;
    optimised?: string | null | undefined;
    boundingBox?: {
      height: string;
      left: string;
      top: string;
      width: string;
    };
  }[];
}

export interface FormData {
  name: string;
  alias?: string[];
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  height: Height;
  hair: string;
  peculiarities: string;
  comment: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
  idVerified?: boolean;
  ageCheck?: boolean;
  idSource?: IdSource;
  images: ImageValue[];
}

interface Props {
  onClose: () => void;
  update: (value: AddOffenderData) => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
}
interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  form: FormInstance<FormData>;
}

const useAddNewOffender = ({
  onClose,
  update: updateOffender,
  onImagesUploaded,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const [saving, setSaving] = useState(false);

  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);

  const onSubmit = (data: FormData) => {
    setSaving(true);
    console.log('offImage', data.images);

    updateOffender({
      id: Math.floor(Math.random() * 1000).toString(),
      name: data.name || 'Unidentified Offender',
      alias:
        data.alias && data.alias.length > 0
          ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
          : [],
      gender: data.gender || null,
      race: data.race || null,
      build: data.build || null,
      hair: data.hair || null,
      peculiarities: data.peculiarities || null,
      age: ageCheck ? null : data.age || null,
      dateSource: ageCheck ? data.dateSource || null : null,
      dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
      idVerified: data.idVerified,
      idSource: data.idSource,
      images: data.images.map((item) => ({
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

    onClose();
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
    ageCheck,
    idVerified,
    form,
  };
};

export default useAddNewOffender;
