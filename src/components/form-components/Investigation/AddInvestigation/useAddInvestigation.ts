import type { CreateInvestigationMutation } from '#/graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import { useCreateInvestigationMutation } from '#/graphql/investigations/mutations/__generated__/create-investigations.generated';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface InvestigationData {
  description?: string;
  groupIds?: string[];
  id?: string;
  name?: string;
}

interface Props {
  crimeGroupId?: null | string;
  incidentId?: null | string;
  offenderId?: null | string;
  onClose: () => void;
  update?: MutationUpdaterFn<CreateInvestigationMutation>;
  vehicleId?: null | string;
}

interface Return {
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

const useAddInvestigation = ({
  crimeGroupId,
  incidentId,
  offenderId,
  onClose,
  update,
  vehicleId,
}: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [createInvestigation] = useCreateInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The investigation has been added! ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
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
          crimeGroupId: crimeGroupId || null,
          description: data.description,
          groupIds: data.groupIds || [],
          incidentId: incidentId || null,
          name: data.name || '',
          offenderId: offenderId || null,
          schemeId,
          vehicleId: vehicleId || null,
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
