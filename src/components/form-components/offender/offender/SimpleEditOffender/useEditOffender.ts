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
  images?: OffenderImage[];
}

interface Props {
  onClose: () => void;
  data: OffenderData;
  update: (value: OffenderData) => void;
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
  images: OffenderImage[];
}

interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
}

const useEditOffender = ({ data, onClose, update }: Props): Return => {
  const [form] = Form.useForm<FormData>();

  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);

  const onSubmit = (values: FormData) => {
    update({
      ...data,
      ...values,
    });
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
