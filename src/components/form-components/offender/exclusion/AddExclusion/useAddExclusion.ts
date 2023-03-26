import { useState } from 'react';

import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';
import { BanData } from 'types/DataType';
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
    return current && current.valueOf() < Date.now() - 3600 * 1000 * 24;
  };

  const onSubmit = (data: BanData) => {
    setSaving(true);
    console.log('data', data.type);

    update({
      id: Math.floor(Math.random() * 1000).toString(),
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      location: data.location || '',
      description: data.description || '',
      type: data.type || null,
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
