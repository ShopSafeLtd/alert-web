import type { Dayjs } from 'dayjs';
import type { BanData } from 'types/DataType';

import { useState } from 'react';

// interface FormData {
//   endDate: Date;
//   startDate: Date;
//   location: string;
//   description: string;
// }

interface Props {
  banData: BanData | null;
  onClose: () => void;
  update: (value: BanData) => void;
}
interface Return {
  disabledDate: (current: Date) => boolean;
  onSubmit: (value: BanData) => void;
  saving: boolean;
  setStartDate: (value: Date | Dayjs | null) => void;
}

const useEditBan = ({ banData, onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [startDate, setStartDate] = useState<Date | Dayjs | null>(null);

  const disabledDate = (current: Date) => {
    if (startDate && startDate?.valueOf() > Date.now()) {
      return current && current.valueOf() < startDate.valueOf();
    }
    return false;
  };
  const onSubmit = (data: BanData) => {
    setSaving(true);
    update({
      ...banData,
      checkId: data.checkId || null,
      companyRef: data.companyRef || null,
      description: data.description || null,
      endDate: data.endDate,
      fineValue: data.fineValue,
      id: banData?.id || '',
      location: data.location || '',
      months: data.months,
      startDate: data.startDate,
      type: data.type || null,
    });
    onClose();
    setSaving(false);
  };

  return {
    disabledDate,
    onSubmit,
    saving,
    setStartDate,
  };
};

export default useEditBan;
