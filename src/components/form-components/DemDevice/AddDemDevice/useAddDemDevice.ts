/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { DemDeviceData, SelectOptions } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';

import { Form, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { UpsertDemDeviceMutation } from './graphql/mutations/__generated__/upsert-dem-device.generated';

import { useDemDeviceModelQuery } from './graphql/__generated__/dem-device-models.generated';
import { useUpsertDemDeviceMutation } from './graphql/mutations/__generated__/upsert-dem-device.generated';

const { useForm } = Form;

export interface FormData {
  business: string;
  demGroups: string[];
  modelId: string;
  name: string;
  serialNumber: string;
}

interface Props {
  businessId?: string;
  editData?: DemDeviceData;
  onClose: () => void;
  updateMutation?: MutationUpdaterFn<UpsertDemDeviceMutation>;
}

interface Return {
  form: FormInstance<FormData>;
  loading: boolean;
  modelsData: SelectOptions[] | undefined;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddDemDevice = ({
  businessId,
  editData,
  onClose,
  updateMutation,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (businessId) {
      form.setFieldsValue({
        business: businessId,
      });
    }
  }, [businessId]);
  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        business: editData.business,
        demGroups: editData.demGroups,
        name: editData.name,
        serialNumber: editData.serialNumber || '',
      });
    }
  }, [editData]);

  const { data: modelsData, loading } = useDemDeviceModelQuery({});
  const [createDemDevice] = useUpsertDemDeviceMutation({
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    void createDemDevice({
      onCompleted: () => {
        setSaving(false);
        onClose();
        notification.success({
          description: intl.formatMessage(
            {
              defaultMessage: 'The dem device has been {value}.',
            },
            {
              value: editData
                ? intl.formatMessage({
                    defaultMessage: 'updated',
                  })
                : intl.formatMessage({
                    defaultMessage: 'added',
                  }),
            }
          ),
          message: intl.formatMessage(
            {
              defaultMessage: 'Successfully {value}!',
            },
            {
              value: editData
                ? intl.formatMessage({
                    defaultMessage: 'Updated',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Added',
                  }),
            }
          ),
          placement: 'bottomRight',
        });
      },
      update: updateMutation,
      variables: {
        data: {
          businessId: businessId || data.business,
          demGroupIds: data.demGroups,
          id: editData?.id,
          modelId: data.modelId,
          name: data.name,
          serialNumber: data.serialNumber,
        },
      },
    });
  };

  return {
    form,
    loading,
    modelsData: modelsData?.demDeviceModel.map((el) => ({
      label: el.name,
      value: el.id,
    })),
    onSubmit,
    saving,
  };
};
export default useAddDemDevice;
