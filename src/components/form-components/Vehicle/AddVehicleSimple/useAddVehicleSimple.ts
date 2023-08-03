/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import { Form } from 'antd';

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
    new: boolean;
  }[];
}

interface Props {
  update: (value: AddVehicleData) => void;
}

export interface FormData {
  make?: string;
  model?: string;
  colour?: string;
  registration?: string;
  images?: { id: string; url: string; optimised: string; new: boolean }[];
}
interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
}

const useAddVehicleSimple = ({ update: updateVehicle }: Props): Return => {
  const [form] = Form.useForm<FormData>();

  const onSubmit = (data: FormData) => {
    updateVehicle({
      id: Math.floor(Math.random() * 1000).toString(),
      make: data.make || '',
      model: data.model || '',
      colour: data.colour || '',
      registration: data.registration || '',
      images: data.images || [],
    });
  };

  return {
    onSubmit,
    form,
  };
};
export default useAddVehicleSimple;
