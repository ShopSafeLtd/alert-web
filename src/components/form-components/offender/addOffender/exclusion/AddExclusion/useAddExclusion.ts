import { useState } from 'react';

import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';
import { Modal } from 'antd';

interface FormData {
  endDate: Date;
  startDate: Date;
  location: string;
  description: string;
}
interface BanData {
  id?: string | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description: string;
}
interface Props {
  onClose: () => void;
  update: (value: BanData) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
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

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (data.startDate.valueOf() > data.endDate.valueOf()) {
      Modal.warning({
        title: 'The end date cannot be earlier than start date.',
        content: 'Please select an another date.',
      });
      setSaving(false);
    } else {
      update({
        id: Math.floor(Math.random() * 1000).toString(),
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        location: data.location || '',
        description: data.description || '',
      });
    }

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
