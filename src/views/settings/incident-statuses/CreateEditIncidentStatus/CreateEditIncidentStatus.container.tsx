import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { message } from 'antd';
import { useCreateIncidentStatusMutation } from 'graphql/incidents/mutations/__generated__/create-incident-status.generated';
import { useUpdateIncidentStatusDataMutation } from 'graphql/incidents/mutations/__generated__/update-incident-status-data.generated';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import View from './CreateEditIncidentStatus.view';

interface IncidentStatusData {
  description?: string;
  name: string;
  tooltip?: string;
}

interface Props {
  id?: string;
  initData?: IncidentStatusData;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateEditIncidentStatus = ({
  id,
  initData,
  onCancel,
  onSuccess,
}: Props) => {
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const [createStatus, { loading: createLoading }] =
    useCreateIncidentStatusMutation();
  const [updateStatus, { loading: updateLoading }] =
    useUpdateIncidentStatusDataMutation();

  const handleSubmit = async (values: IncidentStatusData) => {
    try {
      if (id) {
        await updateStatus({
          refetchQueries: ['ListIncidentStatuses'],
          variables: {
            data: {
              description: values.description
                ? { set: values.description }
                : undefined,
              name: { set: values.name },
            },
            where: { id },
          },
        });
        void message.success(
          intl.formatMessage({ defaultMessage: 'Status updated successfully' })
        );
      } else {
        await createStatus({
          refetchQueries: ['ListIncidentStatuses'],
          variables: {
            data: {
              description: values.description,
              name: values.name,
              scheme: { connect: { id: currentSchemeId } },
            },
          },
        });
        void message.success(
          intl.formatMessage({ defaultMessage: 'Status created successfully' })
        );
      }
      onSuccess();
    } catch (error) {
      void message.error(
        intl.formatMessage({
          defaultMessage: 'An error occurred. Please try again.',
        })
      );
      console.error('Error submitting status:', error);
    }
  };

  return (
    <View
      initData={initData}
      loading={createLoading || updateLoading}
      onCancel={onCancel}
      onSubmit={(values) => {
        void handleSubmit(values);
      }}
    />
  );
};

export default CreateEditIncidentStatus;
