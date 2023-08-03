/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import type { FormInstance } from 'antd';
import { Form } from 'antd';

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
  editData: UpdateVehicleData | undefined | null;
}

export interface FormData {
  registration: string;
  make?: string;
  model?: string;
  colour?: string;
  images?: {
    id: string;
    url?: string | null | undefined;
    optimised?: string | null | undefined;
    new: boolean;
  }[];
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
      images: data.images || [],
    });
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
