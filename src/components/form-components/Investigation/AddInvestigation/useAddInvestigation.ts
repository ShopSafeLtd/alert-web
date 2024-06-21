import { useState } from 'react';
import { notification } from 'antd';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/create-investigations.generated';
import { useCreateInvestigationMutation } from 'graphql/investigations/mutations/create-investigations.generated';

export interface InvestigationData {
  id?: string;
  name?: string;
  description?: string;
  groupIds?: string[];
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
        }),
        description: intl.formatMessage({
          defaultMessage: 'The investigation has been added! ',
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
          groupIds: data.groupIds || [],
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
