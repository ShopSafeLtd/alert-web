/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { DemGroupData, SelectOptions } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Form, notification } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { UpsertDemGroupMutation } from './graphql/mutations/__generated__/upsert-dem-group.generated';

import { useDemDevicesSelectQuery } from './graphql/__generated__/dem-devices.generated';
import { useUpsertDemGroupMutation } from './graphql/mutations/__generated__/upsert-dem-group.generated';

const { useForm } = Form;

export interface FormData {
  demDevices: string[];
  groupId: string;
  name: string;
}

interface Props {
  editData?: DemGroupData;
  onClose: () => void;
  updateMutation?: MutationUpdaterFn<UpsertDemGroupMutation>;
}

interface Return {
  devicesData: SelectOptions[] | undefined;
  form: FormInstance<FormData>;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddDemGroup = ({
  editData,
  onClose,
  updateMutation,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (editData) {
      console.log('editData', editData);

      form.setFieldsValue({
        demDevices: editData.demDevices,
        name: editData.name,
      });
    }
  }, [editData]);
  const { data: devicesData, loading } = useDemDevicesSelectQuery({
    variables: {
      where: {
        scheme: { id: { equals: currentSchemeId } },
      },
    },
  });
  const [createDemGroup] = useUpsertDemGroupMutation({
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    void createDemGroup({
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
          demDeviceIds: data.demDevices,
          groupId: data.groupId,
          id: editData?.id,
          name: data.name || editData?.name || '',
        },
      },
    });
  };

  return {
    devicesData: devicesData?.demDevices.edges.map((el) => ({
      label: el.node.name,
      value: el.node.id,
    })),
    form,
    loading,
    onSubmit,
    saving,
  };
};
export default useAddDemGroup;
