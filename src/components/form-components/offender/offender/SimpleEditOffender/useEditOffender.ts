/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import type {
  Age,
  Build,
  Gender,
  Race,
  Height,
  IdSource,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { ImagePosition } from 'graphql/generated';
import type { ImageValue } from '../../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';

interface OffenderImage {
  id: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
}

export interface OffenderData {
  id: string;
  name?: string | null;
  alias?: string[] | null;
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
  images?: OffenderImage[] | null;
}

interface Props {
  onClose: () => void;
  data: OffenderData;
  update: (value: OffenderData) => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
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
  ageCheck: boolean;
  peculiarities: string;
  comment: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
  idVerified?: boolean;
  idSource?: IdSource;
  images: ImageValue[];
}

interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
}

const useEditOffender = ({
  data,
  onClose,
  update,
  onImagesUploaded,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();

  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);

  const onSubmit = (values: FormData) => {
    update({
      ...data,
      name: values.name || 'Unidentified Offender',
      alias:
        values.alias && values.alias.length > 0
          ? [...new Set(values.alias?.map((el) => el.trim().toLowerCase()))]
          : [],
      // ???
      gender: values.gender || null,
      race: values.race || null,
      build: values.build || null,
      hair: values.hair || null,
      peculiarities: values.peculiarities || null,
      age: ageCheck ? null : values.age || null,
      dateSource: ageCheck ? values.dateSource || null : null,
      dateOfBirth: ageCheck ? values.dateOfBirth || null : null,
      idVerified: values.idVerified,
      idSource: values.idSource,
      images: values.images.map((item) => ({
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

    const uploadedImages = values.images?.filter((image) => image.file) || [];
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

  return {
    onSubmit,
    form,
    ageCheck,
    idVerified,
  };
};

export default useEditOffender;
