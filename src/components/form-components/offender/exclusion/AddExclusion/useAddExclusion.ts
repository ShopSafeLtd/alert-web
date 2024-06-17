import { useState } from 'react';

import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';
import type { BanData } from 'types/DataType';
// import { BanType } from 'graphql/generated';

interface Props {
  onClose: () => void;
  update: (value: BanData) => void;
}

interface Return {
  onSubmit: (value: BanData) => void;
  saving: boolean;
  setStartDate: (value: Moment | Date | null) => void;
  disabledDate: RangePickerProps['disabledDate'];
}

const useAddExclusion = ({ update, onClose }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [startDate, setStartDate] = useState<Moment | Date | null>(null);
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
      id: Math.floor(Math.random() * 1000).toString(),
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location || '',
      description: data.description || '',
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
export default useAddExclusion;
