import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import type { BanData } from 'types/DataType';

import { useState } from 'react';
// import { BanType } from 'graphql/generated';

interface Props {
  onClose: () => void;
  update: (value: BanData) => void;
}

interface Return {
  disabledDate: RangePickerProps['disabledDate'];
  onSubmit: (value: BanData) => void;
  saving: boolean;
  setStartDate: (value: Date | Dayjs | null) => void;
}

const useAddExclusion = ({ onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [startDate, setStartDate] = useState<Date | Dayjs | null>(null);
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    if (startDate && startDate?.valueOf() > Date.now()) {
      return current && current.valueOf() < startDate.valueOf();
    }
    return false;
  };

  const onSubmit = (data: BanData) => {
    setSaving(true);

    update({
      description: data.description || '',
      endDate: data.endDate,
      fineValue: data.fineValue,
      id: Math.floor(Math.random() * 1000).toString(),
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
export default useAddExclusion;
