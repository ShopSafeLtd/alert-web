import { useState } from 'react';
import { useUpdateInvestigationDetailsMutation } from 'graphql/generated';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { InvestigationDetails } from 'types/DataType';

interface Props {
  onClose: () => void;
  investigationData: InvestigationDetails;
}

interface Return {
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

export interface InvestigationData {
  id?: string;
  name?: string;
  description?: string;
  groupIds?: string[];
}

const useAddInvestigation = ({ onClose, investigationData }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [updateInvestigation] = useUpdateInvestigationDetailsMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The details of this investigation has been updated! ',
          id: 'u3Hlky',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: InvestigationData) => {
    setSaving(true);

    const initGroupIds = investigationData.groupIds || [];
    const allGroupIds = data.groupIds || [];
    const addedGroupIds = allGroupIds.filter(
      (id) => !initGroupIds.includes(id)
    );
    const removedGroupIds = initGroupIds.filter(
      (id) => !allGroupIds.includes(id)
    );

    void updateInvestigation({
      variables: {
        where: { id: investigationData.id },
        data: {
          name: data.name || '',
          description: data.description,
          groupIds: addedGroupIds,
          groupIdsToRemove: removedGroupIds,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};
export default useAddInvestigation;
