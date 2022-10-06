import { useState } from 'react';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';

interface FormData {
  endDate: Date;
  startDate: Date;
  location: string;
  description: string;
}
interface BanData {
  id: string;
  title?: string | null | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description?: string | null | undefined;
}
interface Props {
  onClose: () => void;
  update: (value: BanData) => void;
  banData: BanData | null;
}
interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setStartDate: (value: Moment | Date | null) => void;
  disabledDate: RangePickerProps['disabledDate'];
}

const useEditBan = ({ onClose, update, banData }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [startDate, setStartDate] = useState<Moment | Date | null>(null);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    if (startDate && startDate?.valueOf() > Date.now()) {
      return current && current.valueOf() < startDate.valueOf();
    }
    return current && current.valueOf() < Date.now() - 3600 * 1000 * 24;
  };
  const onSubmit = (data: FormData) => {
    setSaving(true);
    update({
      id: banData?.id || '',
      title: banData?.title || null,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location || '',
      description: data.description || null,
    });
    onClose();
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
    setStartDate,
    disabledDate,
  };
};

export default useEditBan;
