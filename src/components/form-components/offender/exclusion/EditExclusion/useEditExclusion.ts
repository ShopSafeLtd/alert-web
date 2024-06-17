import { useState } from 'react';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';
import type { BanData } from 'types/DataType';

// interface FormData {
//   endDate: Date;
//   startDate: Date;
//   location: string;
//   description: string;
// }

interface Props {
  onClose: () => void;
  update: (value: BanData) => void;
  banData: BanData | null;
}
interface Return {
  onSubmit: (value: BanData) => void;
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
    return false;
  };
  const onSubmit = (data: BanData) => {
    setSaving(true);
    update({
      ...banData,
      id: banData?.id || '',
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location || '',
      description: data.description || null,
      type: data.type || null,
      months: data.months,
      fineValue: data.fineValue,
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
