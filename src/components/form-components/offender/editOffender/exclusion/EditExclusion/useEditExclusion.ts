import { useState } from 'react';
import { BanQuery, useUpdateBanMutation, useBanQuery } from 'graphql/generated';
import { notification } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';

interface FormData {
  endDate: Date;
  startDate: Date;
  location: string;
  description: string;
}
interface Props {
  onClose: () => void;
  banId: string | undefined;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: BanQuery | undefined;
  loading: boolean;
  saving: boolean;
  setStartDate: (value: Moment | Date | null) => void;
  disabledDate: RangePickerProps['disabledDate'];
}

const useEditBan = ({ onClose, banId }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [startDate, setStartDate] = useState<Moment | Date | null>(null);
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    if (startDate && startDate?.valueOf() > Date.now()) {
      return current && current.valueOf() < startDate.valueOf();
    }
    return current && current.valueOf() < Date.now() - 3600 * 1000 * 24;
  };

  const { data: BanData, loading } = useBanQuery({
    variables: {
      where: {
        id: banId,
      },
    },
  });

  const [updateBan] = useUpdateBanMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The exclusion has been updated! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (banId)
      updateBan({
        variables: {
          where: {
            id: banId,
          },
          data: {
            startDate: { set: data.startDate },
            endDate: { set: data.endDate },
            location: { set: data.location },
            description: { set: data.description || null },
          },
        },
      });
  };

  return {
    onSubmit,
    data: BanData,
    loading,
    saving,
    setStartDate,
    disabledDate,
  };
};

export default useEditBan;
