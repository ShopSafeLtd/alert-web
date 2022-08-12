import { useState } from 'react';
import { CreateBanMutation, useCreateBanMutation } from 'graphql/generated';
import { Modal, notification } from 'antd';
import { MutationUpdaterFn } from '@apollo/client';
import { useStoreState } from 'state';
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
  update: MutationUpdaterFn<CreateBanMutation>;
  offenderId: string | undefined;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;

  setStartDate: (value: Moment | Date | null) => void;
  disabledDate: RangePickerProps['disabledDate'];
}

const useAddExclusion = ({ update, onClose, offenderId }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [startDate, setStartDate] = useState<Moment | Date | null>(null);
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    if (startDate && startDate?.valueOf() > Date.now()) {
      return current && current.valueOf() < startDate.valueOf();
    }
    return current && current.valueOf() < Date.now() - 3600 * 1000 * 24;
  };
  const [createBan] = useCreateBanMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Added!',
        description: 'The exclusion has been added! ',
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
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (data.startDate.valueOf() > data.endDate.valueOf()) {
      Modal.warning({
        title: 'The end date cannot be earlier than start date.',
        content: 'Please select an another date.',
      });
      setSaving(false);
    } else {
      createBan({
        variables: {
          data: {
            startDate: data.startDate,
            endDate: data.endDate,
            location: data.location,
            description: data.description || '',
            scheme: {
              connect: {
                id: schemeId,
              },
            },
            createdBy: { connect: { id: userId } },
            offender: { connect: { id: offenderId } },
          },
        },
      });
    }
  };

  return {
    onSubmit,
    saving,
    setStartDate,
    disabledDate,
  };
};
export default useAddExclusion;
