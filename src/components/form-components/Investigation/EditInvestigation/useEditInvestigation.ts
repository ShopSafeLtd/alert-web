import type { InvestigationPriority, InvestigationType } from 'graphql/types';
import type { InvestigationDetails } from 'types/DataType';

import { notification } from 'antd';
import { useUpdateInvestigationDetailsMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-details.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  investigationData: InvestigationDetails;
  onClose: () => void;
}

interface Return {
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

export interface InvestigationData {
  description?: string;
  groupIds?: string[];
  id?: string;
  name?: string;
  priority?: InvestigationPriority;
  type?: InvestigationType;
}

const useAddInvestigation = ({ investigationData, onClose }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [updateInvestigation] = useUpdateInvestigationDetailsMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The details of this investigation has been updated! ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
        data: {
          description: data.description,
          groupIds: addedGroupIds,
          groupIdsToRemove: removedGroupIds,
          name: data.name || '',
          priority: data.priority,
          type: data.type,
        },
        where: { id: investigationData.id },
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};
export default useAddInvestigation;
