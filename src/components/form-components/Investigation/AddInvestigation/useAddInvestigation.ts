import { useState } from 'react';
import type { CreateInvestigationMutation } from 'graphql/generated';
import { useCreateInvestigationMutation } from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

export interface InvestigationData {
  id?: string;
  name?: string;
  description?: string;
}

interface Props {
  onClose: () => void;
  incidentId?: string | null;
  offenderId?: string | null;
  vehicleId?: string | null;
  crimeGroupId?: string | null;
  update?: MutationUpdaterFn<CreateInvestigationMutation>;
}

interface Return {
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

const useAddInvestigation = ({
  onClose,
  update,
  offenderId,
  incidentId,
  vehicleId,
  crimeGroupId,
}: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [createInvestigation] = useCreateInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The investigation has been added! ',
          id: 'Y0ftuc',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });

  const onSubmit = (data: InvestigationData) => {
    setSaving(true);
    void createInvestigation({
      variables: {
        data: {
          name: data.name || '',
          description: data.description,
          schemeId,
          incidentId: incidentId || null,
          offenderId: offenderId || null,
          vehicleId: vehicleId || null,
          crimeGroupId: crimeGroupId || null,
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
